const express = require("express");
const router = express.Router();
const {
  getProduct,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
} = require("../controllers/productController");
const { verifyTokenAndAdmin } = require("./verifyToken");

// get product by id
router.get("/find/:id", getProductById);

// get all product
router.get("/", getProduct);
// create product
router.post("/", verifyTokenAndAdmin, createProduct);

// update product
router.put("/", verifyTokenAndAdmin, updateProduct);

// delete product
router.delete("/", verifyTokenAndAdmin, deleteProduct);

module.exports = router;
