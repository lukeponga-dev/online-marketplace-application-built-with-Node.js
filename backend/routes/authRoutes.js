// routes/auth.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { check } = require('express-validator');
const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
};

// Registration route
router.post(
  '/register',
  [
    // Input validation
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  registerUser
);

// Login route
router.post(
  '/login',
  [
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password is required').notEmpty(),
  ],
  loginUser
);

module.exports = router;
const { logoutUser, isAuthenticated } = require('../controllers/authController');

router.get('/logout', logoutUser);
router.get('/isAuthenticated', isAuthenticated);
