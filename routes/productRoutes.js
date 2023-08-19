const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// get product by id
router.get("/:id");

// get all product
router.get("/");

module.exports = router;
