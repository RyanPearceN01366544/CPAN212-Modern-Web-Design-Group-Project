<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState } from "react";
=======
import React from "react";
>>>>>>> 93241b1 (Pages)
=======
import React, { useState } from "react";
>>>>>>> 33d27ad (Checkout/Cart)
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import { useCart } from "../context/CartContext";

const CheckoutPage = () => {
  const navigate = useNavigate();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 33d27ad (Checkout/Cart)
=======
  const { cartItems, getCartTotal, clearCart } = useCart();
>>>>>>> 23ea5f4 (edit shopping cart and checkout)
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    payment: "Credit Card",
  });
<<<<<<< HEAD

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
=======
=======
>>>>>>> 33d27ad (Checkout/Cart)

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
<<<<<<< HEAD
    navigate("/"); // Redirect to homepage or shop
>>>>>>> 93241b1 (Pages)
=======
    navigate("/");
>>>>>>> 33d27ad (Checkout/Cart)
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
<<<<<<< HEAD
      <p>Enter your details to complete the purchase.</p>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 33d27ad (Checkout/Cart)
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name<span>*</span>:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
<<<<<<< HEAD
=======
      <div className="checkout-content">
        {/* Payment and Billing Form */}
        <div className="checkout-form">
          <h3>Billing Information</h3>
          <form onSubmit={handleSubmit}>
            <label>Name<span>*</span>:</label>
            <input type="text" name="name" placeholder="Your Full Name" value={formData.name} onChange={handleChange} required />
>>>>>>> 23ea5f4 (edit shopping cart and checkout)

            <label>Address<span>*</span>:</label>
            <input type="text" name="address" placeholder="Shipping Address" value={formData.address} onChange={handleChange} required />

<<<<<<< HEAD
        <label htmlFor="payment">Payment Method:</label>
        <select
          id="payment"
          name="payment"
          value={formData.payment}
          onChange={handleChange}
          required
        >
=======
      <form>
        <label>Name:</label>
        <input type="text" placeholder="Your Name" required />
=======
>>>>>>> 33d27ad (Checkout/Cart)

        <label htmlFor="address">Address<span>*</span>:</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Shipping Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

<<<<<<< HEAD
        <label>Payment Method:</label>
        <select required>
>>>>>>> 93241b1 (Pages)
=======
        <label htmlFor="payment">Payment Method:</label>
        <select
          id="payment"
          name="payment"
          value={formData.payment}
          onChange={handleChange}
          required
        >
>>>>>>> 33d27ad (Checkout/Cart)
          <option>Credit Card</option>
          <option>PayPal</option>
          <option>Cash on Delivery</option>
        </select>

<<<<<<< HEAD
<<<<<<< HEAD
        <button type="submit" className="confirm-btn">
=======
        <button type="submit" className="confirm-btn" onClick={handleCheckout}>
>>>>>>> 93241b1 (Pages)
=======
        <button type="submit" className="confirm-btn">
>>>>>>> 33d27ad (Checkout/Cart)
          Confirm Order
        </button>
      </form>
=======
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
>>>>>>> 23ea5f4 (edit shopping cart and checkout)
    </div>
  );
};

export default CheckoutPage;
