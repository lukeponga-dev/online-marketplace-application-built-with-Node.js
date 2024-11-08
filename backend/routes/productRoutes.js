const express = require('express');
const router = express.Router();
const {
  addProduct,
  getProducts,
  getVendorProducts,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Public route to get all products
router.get('/', getProducts);

// Vendor routes
router.post('/add', protect, authorizeRoles('vendor'), addProduct);
router.get('/vendor', protect, authorizeRoles('vendor'), getVendorProducts);

// Additional routes can be added here

module.exports = router;
