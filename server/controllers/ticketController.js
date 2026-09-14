const Ticket = require('../models/Ticket');
const Comment = require('../models/Comment');

// @route  POST /api/tickets   (any logged-in user)
const createTicket = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;

    const ticket = await Ticket.create({
      title,
      description,
      category,
      priority,
      createdBy: req.user._id,
    });

    res.status(201).json({ ticket });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create ticket' });
  }
};

// @route  GET /api/tickets
// Users see only their own tickets. Admins see all tickets.
const getTickets = async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { createdBy: req.user._id };

    const tickets = await Ticket.find(filter)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tickets' });
  }
};

// @route  GET /api/tickets/:id
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email');

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Ownership check: a regular user can only view their own ticket
    if (req.user.role !== 'admin' && ticket.createdBy._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You do not have access to this ticket' });
    }

    const comments = await Comment.find({ ticket: ticket._id })
      .populate('author', 'name role')
      .sort({ createdAt: 1 });

    res.status(200).json({ ticket, comments });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch ticket' });
  }
};

// @route  PUT /api/tickets/:id
// Owner can edit title/description/category/priority (if not closed).
// Admin can additionally change status and assignedTo.
const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const isOwner = ticket.createdBy.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'You do not have access to this ticket' });
    }

    const { title, description, category, priority, status, assignedTo } = req.body;

    if (title !== undefined) ticket.title = title;
    if (description !== undefined) ticket.description = description;
    if (category !== undefined) ticket.category = category;
    if (priority !== undefined) ticket.priority = priority;

    // Only admins can change status or assignment
    if (isAdmin) {
      if (status !== undefined) ticket.status = status;
      if (assignedTo !== undefined) ticket.assignedTo = assignedTo || null;
    }

    await ticket.save();
    res.status(200).json({ ticket });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update ticket' });
  }
};

// @route  DELETE /api/tickets/:id
const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const isOwner = ticket.createdBy.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'You do not have access to this ticket' });
    }

    await Comment.deleteMany({ ticket: ticket._id });
    await ticket.deleteOne();

    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete ticket' });
  }
};

// @route  POST /api/tickets/:id/comments
const addComment = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const isOwner = ticket.createdBy.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'You do not have access to this ticket' });
    }

    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Comment cannot be empty' });
    }

    const comment = await Comment.create({
      ticket: ticket._id,
      author: req.user._id,
      message: message.trim(),
    });

    const populatedComment = await comment.populate('author', 'name role');

    res.status(201).json({ comment: populatedComment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add comment' });
  }
};

module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  addComment,
};