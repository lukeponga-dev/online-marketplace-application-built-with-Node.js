const express = require('express');
const router = express.Router();
const { createOrder, getBuyerOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Buyer routes
router.post('/create', protect, authorizeRoles('buyer'), createOrder);
router.get('/buyer', protect, authorizeRoles('buyer'), getBuyerOrders);

module.exports = router;
