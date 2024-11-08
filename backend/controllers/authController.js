// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const jwtSecret = process.env.JWT_SECRET;

// Register a new user
exports.registerUser = async (req, res) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Send the first error message
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { username, password, role } = req.body;

  try {
    // Check if username already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create and save the new user
    user = new User({ username, password, role });
    await user.save();
    
// Generate JWT token 
const token = jwt.sign( 
{ id: user._id, username: user.username, role: user.role }, 
jwtSecret, 
{ expiresIn: '1h' } 
);

    // Set cookie
    res.cookie('token', token, { httpOnly: true });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Log in a user
exports.loginUser = async (req, res) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Send the first error message
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { username, password } = req.body;

  try {
    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, jwtSecret, {
      expiresIn: '1h',
    });

    // Set cookie
    res.cookie('token', token, { httpOnly: true });

    res.json({ message: 'User logged in successfully', role: user.role });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
// Check if the user is authenticated
exports.isAuthenticated = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ isAuthenticated: false });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    res.json({ isAuthenticated: true, username: decoded.username });
  } catch (err) {
    res.json({ isAuthenticated: false });
  }
};

// Logout user by clearing the token cookie
exports.logoutUser = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};


};
// Check if the user is authenticated
exports.isAuthenticated = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ isAuthenticated: false });
    }
    try {
      const decoded = jwt.verify(token, jwtSecret);
      res.json({ isAuthenticated: true, username: decoded.username });
    } catch (err) {
      res.json({ isAuthenticated: false });
    }
  };
  
  // Logout user by clearing the token cookie
  exports.logoutUser = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
  };
  