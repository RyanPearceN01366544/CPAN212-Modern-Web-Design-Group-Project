import express from "express";
import Product from "../models/Product.js";
import auth from "../middleware/auth.js";

const product_router = express.Router();

// == ROUTES ==

// 🔍 GET all products (limit to 10 for preview)
product_router.get("/", async (req, res) => {
  try {
    const products = await Product.find().limit(10);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve products" });
  }
});

// 🔍 GET product by SKU
product_router.get("/:sku", async (req, res) => {
  try {
    const product = await Product.findOne({ sku: req.params.sku });
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve product details" });
  }
});

// 🧠 FILTER products by query (category, gender, type, color)
product_router.get("/filter/search", async (req, res) => {
  const { category, gender, type, color } = req.query;

  const filter = {};
  if (category) filter.category = category;
  if (gender) filter.gender = gender;
  if (type) filter.type = type;
  if (color) filter.color = color;

  try {
    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to filter products" });
  }
});

// ➕ POST new product (secure with token)
product_router.post("/", auth.verifyToken, async (req, res) => {
  try {
    const user = req.user;

    // TODO: Optional permission check
    // if (!user.permissions?.includes("CreateProduct")) {
    //   return res.status(403).json({ message: "Not authorized to add products" });
    // }

    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ error: "Failed to create product" });
  }
});

export default product_router;
