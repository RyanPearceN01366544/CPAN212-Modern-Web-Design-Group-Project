import express from "express";

const product_router = express.Router();

product_router.get("/", (req, res) => {
    res.status(404).send("Product not specified.");
});

// -- TODO: Product --
// GetProductDetails -> Gets the details of a specific item using SKU.
// GetProducts -> Should return a short list of 

export default product_router;