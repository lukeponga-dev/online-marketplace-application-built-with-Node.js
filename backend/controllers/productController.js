// controllers/productController.js
const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const product = new Product({
      name,
      price,
      description,
      vendor: req.user.id, // Associate product with vendor's user ID
    });
    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("vendor", "username");
    res.json(products);
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getVendorProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.user.id });
    res.json(products);
  } catch (err) {
    console.error("Get vendor products error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
