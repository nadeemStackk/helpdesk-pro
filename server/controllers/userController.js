const User = require('../models/User');

// @route  GET /api/users
// @access Admin only
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// @route  PATCH /api/users/:id
// @access Admin only
const updateUser = async (req, res) => {
  try {
    const { role, isActive } = req.body;
    const targetUser = await User.findById(req.params.id);

    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent an admin from locking themselves out
    if (targetUser._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot modify your own account here' });
    }

    if (role !== undefined) {
      if (!['user', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }
      targetUser.role = role;
    }

    if (isActive !== undefined) {
      targetUser.isActive = isActive;
    }

    await targetUser.save();

    res.status(200).json({
      user: {
        id: targetUser._id,
        name: targetUser.name,
        email: targetUser.email,
        role: targetUser.role,
        isActive: targetUser.isActive,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user' });
  }
};

module.exports = { getAllUsers, updateUser };