const { body, validationResult } = require('express-validator');

const validateRegistration = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('influencerId').notEmpty().withMessage('Influencer ID is required'),
];

const validateLogin = [
  body('influencerId').notEmpty().withMessage('Influencer ID is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

module.exports = { validateRegistration, validateLogin };