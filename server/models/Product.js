import mongoose from "mongoose";

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

const productSchema = mongoose.Schema({
    
});
const Product = mongoose.model("Product", productSchema);
export default productSchema;