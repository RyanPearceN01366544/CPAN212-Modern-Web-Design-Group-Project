// == R ==
// -- Product Vars Todo List --
// 1. SKU [Required] [Unique Key] (Example: "SKE-SHO-SNE-949291")
// 2. Name [Required] (Example: "Men's Hands Free Slip-Ins" [you get the rest])
// 3. Images [Required] (Example: {link1: "https://example.com/image1.png", link2: "https://example.com/image2.png"})
// 3. Price [Required] (Example: 200.00)
// 4. Items Left [Required] (Example: 5)
// 5. Category (Example: "Shoes")
// 6. Type (Example: "Sneakers")
// 7. Brand (Example: "Skechers")

import mongoose from "mongoose";

// Product Schema
const productSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    index: true // Add index for better search performance
  },
  images: { // R: Replaced in favor of Array.
      type: [String],
      required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  itemsLeft: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    default: "Uncategorized",
    index: true // Add index for better search performance
  },
  type: {
    type: String,
    default: "",
    index: true // Add index for better search performance
  },
  brand: {
    type: String,
    default: "",
    index: true // Add index for better search performance
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
    index: true
  }
}, {
  timestamps: true
});

// Add text index for better search
productSchema.index({ 
  name: 'text',
  brand: 'text',
  category: 'text',
  type: 'text'
});

const Product = mongoose.model("Product", productSchema);
export default Product;