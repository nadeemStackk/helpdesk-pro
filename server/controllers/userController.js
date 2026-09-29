const User = require('../models/User');
const { isAdminRole } = require('../middleware/auth');

// @route  GET /api/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// @route  PATCH /api/users/:id
const updateUser = async (req, res) => {
  try {
    const { role, isActive } = req.body;
    const targetUser = await User.findById(req.params.id);

    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (targetUser._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot modify your own account here' });
    }

    // Only a superadmin can modify another admin or superadmin account
    if (isAdminRole(targetUser.role) && req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Only a super-admin can manage admin accounts' });
    }

    // Nobody can promote/demote into or out of 'superadmin' via this route
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