const express = require('express');
const router = express.Router();
const { getAllUsers, updateUser } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, authorize('admin'), getAllUsers);
router.patch('/:id', protect, authorize('admin'), updateUser);

module.exports = router;