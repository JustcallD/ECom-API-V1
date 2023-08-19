const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const cartController = require('../controllers/cartController');

// Protected route: Add product to cart
router.post('/cart/add', authMiddleware, cartController.addToCart);

module.exports = router;
