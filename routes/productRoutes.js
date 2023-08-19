const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Public route: Get products by category
router.get('/products/category/:categoryId', productController.getProductsByCategory);

// Public route: Get product details
router.get('/products/:productId', productController.getProductDetails);

module.exports = router;
