// routes/products.js
const express = require('express');
const router = express.Router();
const { getProducts, addProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.post('/add', protect, authorizeRoles('vendor'), addProduct);
module.exports = router;