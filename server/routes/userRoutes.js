const express = require('express');
const router = express.Router();
const { getAllUsers, updateUser } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, authorize('admin', 'superadmin'), getAllUsers);
router.patch('/:id', protect, authorize('admin', 'superadmin'), updateUser);

module.exports = router;