const express = require('express');
const router = express.Router();
const { signup, login, getMe } = require('../controllers/authController');
const { signupValidation, loginValidation } = require('../middleware/validators');
const { protect } = require('../middleware/auth');

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.get('/me', protect, getMe);

module.exports = router;