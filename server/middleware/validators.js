const { body, validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
};

const signupValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  handleValidation,
];

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidation,
];

const ticketValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category')
    .optional()
    .isIn(['Technical', 'Billing', 'Account', 'Feature Request', 'Other'])
    .withMessage('Invalid category'),
  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High', 'Urgent'])
    .withMessage('Invalid priority'),
  handleValidation,
];

const commentValidation = [
  body('message').trim().notEmpty().withMessage('Comment cannot be empty'),
  handleValidation,
];
module.exports = { signupValidation, loginValidation, ticketValidation, commentValidation };