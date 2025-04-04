import express from "express";
import Product from "../models/Product.js";
import auth from "../middleware/auth.js";

const product_router = express.Router();

// GET all products (short list)
product_router.get("/", async (req, res) => {
  try {
    const products = await Product.find().limit(10);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve products" });
  }
});

// GET product by SKU
product_router.get("/:sku", async (req, res) => {
  try {
    const product = await Product.findOne({ sku: req.params.sku });
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve product details" });
  }
});

// POST new product (optional: admin only)
product_router.post("/", auth.verifyToken, async (req, res) => {
  try {
    const user = req.user;

    // TODO: You can check for admin permissions here if needed
    // if (!user.permissions?.includes("CreateProduct")) {
    //   return res.status(403).json({ message: "Not authorized" });
    // }

    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ error: "Failed to create product" });
  }
});

export default product_router;
