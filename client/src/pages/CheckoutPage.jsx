import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import { useCart } from "../context/CartContext";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    payment: "Credit Card",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.address) {
      alert("Please fill out all required fields.");
      return;
    }
    alert("Thank you for your purchase!");
    clearCart();
    navigate("/");
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-content">
        {/* Payment and Billing Form */}
        <div className="checkout-form">
          <h3>Billing Information</h3>
          <form onSubmit={handleSubmit}>
            <label>Name<span>*</span>:</label>
            <input type="text" name="name" placeholder="Your Full Name" value={formData.name} onChange={handleChange} required />

            <label>Address<span>*</span>:</label>
            <input type="text" name="address" placeholder="Shipping Address" value={formData.address} onChange={handleChange} required />

            <label>Payment Method:</label>
            <select name="payment" value={formData.payment} onChange={handleChange} required>
              <option>Credit Card</option>
              <option>PayPal</option>
              <option>Cash on Delivery</option>
            </select>

            <button type="submit" className="confirm-btn">Place Your Order</button>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="order-item">
                <span>{item.name}</span>
                <span>${(item.price * item.quantity).toFixed(2)} ({item.quantity})</span>
              </li>
            ))}
          </ul>
          <h3>Total: ${getCartTotal().toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
