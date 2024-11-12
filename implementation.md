To implement a feature-rich application with functionalities like browsing products, adding products to a cart, user registration, login, and server-side authentication, let's outline a full-stack solution using Node.js with Express (backend), MongoDB (database), and React (frontend). This setup will follow the MERN stack (MongoDB, Express, React, Node.js).

### Key Features to Implement

1. Browse Products

Display a list of products from the database.

Allow searching and filtering of products.



2. Add Products to Cart

Users can add products to their shopping cart.

The cart state will be managed both on the client (React) and server side (Node.js).



3. User Registration and Login

Implement user registration with email, password, and profile information.

User login with JWT-based authentication for secure sessions.



4. Server-side Authentication

Use JWT tokens for secure authentication.

Protect routes to allow access only to authenticated users.





---

Project Structure

Here's a suggested folder structure for a clean and maintainable project:

project-root/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── index.js
├── .env
├── package.json

Step-by-Step Implementation


---

1. Backend Setup (Node.js with Express)

/backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use(errorHandler);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


---

/backend/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);


---

/backend/routes/userRoutes.js

const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;


---

/backend/controllers/userController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register User
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ name, email, password });
  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(201).json({ token });
  }
  res.status(400).json({ message: 'Invalid user data' });
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).json({ message: 'Invalid email or password' });
};


---

2. Frontend Setup (React)

/frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;


---

/frontend/src/pages/HomePage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('http://localhost:5000/api/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product._id}>
          <h2>{product.name}</h2>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;


---

3. Environment Variables (.env)

MONGO_URI=mongodb://localhost:27017/yourdbname
JWT_SECRET=yourjwtsecret
PORT=5000


---

4. NPM Dependencies

Install necessary packages:

# Backend
npm install express mongoose dotenv bcryptjs jsonwebtoken cors

# Frontend
cd frontend
npm install axios react-router-dom


---

Next Steps:

a. Add features like product filtering, sorting, and cart management.
b. Implement unit tests for routes and controllers using Jest or Mocha.

