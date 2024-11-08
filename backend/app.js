// app.js

// Import required modules
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Set Mongoose strictQuery option
mongoose.set('strictQuery', true);

// Connect to MongoDB using async/await
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
connectDB();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Frontend's local address
  credentials: true, // Allow cookies to be sent
}));

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const checkoutRoutes = require('./routes/checkout');

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/checkout', checkoutRoutes);

// Catch-all route for serving the main page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
