const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

// Protected route: Place an order
router.post('/order/place', authMiddleware, orderController.placeOrder);

module.exports = router;
