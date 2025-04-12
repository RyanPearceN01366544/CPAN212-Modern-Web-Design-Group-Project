import express from "express";
import Order from "../models/Order.js"; // Adjust path if needed
import auth from "../middleware/auth.js";
 
const order_router = express.Router();
 
// CREATE ORDER
order_router.post("/", auth.verifyToken, async (req, res) => {
  try {
    const { user, items, shippingAddress, totalAmount } = req.body;
 
    if (!user || !items || !shippingAddress || !totalAmount) {
      return res.status(400).json({ message: "Missing required fields." });
    }
 
    const newOrder = new Order({
      user,
      items,
      shippingAddress,
      totalAmount
    });
 
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error while creating order." });
  }
});
 
// GET ORDERS BY USER ID
order_router.get("/user/:userId", auth.verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;
 
    const orders = await Order.find({ user: userId }).populate("items.product", "name price images");
 
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error while fetching orders." });
  }
});
 
export default order_router;