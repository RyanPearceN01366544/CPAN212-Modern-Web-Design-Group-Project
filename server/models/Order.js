import mongoose from "mongoose";
 
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      priceAtPurchase: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
  shippingAddress: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  placedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true
});
 
const Order = mongoose.model("Order", orderSchema);
export default Order;