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

// R: Adding Get By ID.
product_router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve product details" });
  }
});

/* R: This would've been nice for getting the SKU of a product... but you'll have to settle with this.
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
*/

// 🧠 FILTER products by query (category, gender, type, color)
product_router.get("/filter/search", async (req, res) => { // R: Editted to allow title searching & changing to body for ease.
  const { name, category, gender, type, color } = req.body;

  const filter = {};
  if (name) filter.name = {$regex: name, $options: 'i'}; // R: Case insensitive and checks for item.
  if (category) filter.category = {$regex: category, $options: 'i'};
  //if (gender) filter.gender = {$regex: gender, $options: 'i'}; // R: Gender doesn't exist on model. Too late to fix.
  if (type) filter.type = {$regex: type, $options: 'i'};
  if (color) filter.color = {$regex: color, $options: 'i'};

  try {
    
    let products = await Product.find(filter);
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
