import express from "express";
import Product from "../models/Product.js";
import auth from "../middleware/auth.js";

const product_router = express.Router();

// == ROUTES ==

// GET all products with pagination
product_router.get("/", async (req, res) => {
  const { page = 1, limit = 20, category, rating } = req.query;
  
  try {
    const filter = {};
    
    // Add category filter if provided
    if (category) {
      filter.category = category;
      console.log('Filtering by category:', category);
    }
    
    // Add rating filter if provided
    if (rating) {
      filter.rating = { $gte: parseFloat(rating) };
    }
    
    console.log('MongoDB Filter:', filter);
    
    const products = await Product.find(filter)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    const total = await Product.countDocuments(filter);
    
    console.log(`Found ${total} products matching filter`);
    
    res.status(200).json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      totalProducts: total
    });
  } catch (error) {
    console.error('Error in /Product:', error);
    res.status(500).json({ error: "Failed to retrieve products" });
  }
});

// Get product by ID
product_router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.error('Error in /Product/:id:', error);
    res.status(500).json({ error: "Failed to retrieve product details" });
  }
});

// FILTER products by query (category, type, brand, rating)
product_router.get("/filter/search", async (req, res) => {
  const { page = 1, limit = 20, name, category, type, brand, rating } = req.query;
  
  try {
    const filter = {};
    
    // Search logic for name
    if (name) {
      filter.$or = [
        { name: { $regex: name, $options: 'i' } },
        { description: { $regex: name, $options: 'i' } }
      ];
    }
    
    // Filter by category
    if (category) {
      filter.category = category;
    }
    
    // Filter by type
    if (type) {
      filter.type = type;
    }
    
    // Filter by brand
    if (brand) {
      filter.brand = brand;
    }
    
    // Filter by rating
    if (rating) {
      const ratingValue = parseFloat(rating);
      if (!isNaN(ratingValue) && ratingValue >= 0 && ratingValue <= 5) {
        filter.rating = { $gte: ratingValue };
      }
    }
    
    console.log('Filter query:', filter); // Debug log
    
    const products = await Product.find(filter)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    const total = await Product.countDocuments(filter);
    
    res.status(200).json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      totalProducts: total
    });
  } catch (error) {
    console.error('Filter error:', error); // Debug log
    res.status(500).json({ error: "Failed to filter products" });
  }
});

// POST new product (secure with token)
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
