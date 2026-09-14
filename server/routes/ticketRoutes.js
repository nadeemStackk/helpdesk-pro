const express = require('express');
const router = express.Router();
const {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  addComment,
} = require('../controllers/ticketController');
const { protect } = require('../middleware/auth');
const { ticketValidation, commentValidation } = require('../middleware/validators');

router.use(protect); // every route below requires login

router.post('/', ticketValidation, createTicket);
router.get('/', getTickets);
router.get('/:id', getTicketById);
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);
router.post('/:id/comments', commentValidation, addComment);

module.exports = router;