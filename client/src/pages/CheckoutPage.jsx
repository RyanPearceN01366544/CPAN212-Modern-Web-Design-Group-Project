<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
<<<<<<< HEAD
=======
>>>>>>> 33d27ad (Checkout/Cart)
=======
  const { cartItems, getCartTotal, clearCart } = useCart();
>>>>>>> 23ea5f4 (edit shopping cart and checkout)
=======
  const { cartItems, getCartTotal, clearCart } = useCart();
>>>>>>> ea2b2a5 (edit shopping cart and checkout)
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
=======
import React from "react";
=======
import React, { useState } from "react";
>>>>>>> 90c915d (Checkout/Cart)
=======
import React from "react";
>>>>>>> fd4e352 (Pages)
=======
import React, { useState } from "react";
>>>>>>> ff649c9 (Checkout/Cart)
=======
import React from "react";
>>>>>>> 1d4ac54 (Pages)
=======
import React, { useState } from "react";
>>>>>>> c9bb840 (Checkout/Cart)
=======
import React from "react";
>>>>>>> b501ffc (Pages)
=======
import React, { useState } from "react";
>>>>>>> 3f6e088 (Checkout/Cart)
=======
import React from "react";
>>>>>>> f8d2833 (Pages)
=======
import React, { useState } from "react";
>>>>>>> 0396ef7 (Checkout/Cart)
=======
import React from "react";
>>>>>>> 3e5b3f4 (Pages)
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    alert("Thank you for your purchase!");
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    navigate("/"); // Redirect to homepage or shop
>>>>>>> cbd676a (Pages)
=======
    navigate("/");
>>>>>>> 90c915d (Checkout/Cart)
=======
    navigate("/"); // Redirect to homepage or shop
>>>>>>> fd4e352 (Pages)
=======
    navigate("/");
>>>>>>> ff649c9 (Checkout/Cart)
=======
    navigate("/"); // Redirect to homepage or shop
>>>>>>> 1d4ac54 (Pages)
=======
    navigate("/");
>>>>>>> c9bb840 (Checkout/Cart)
=======
    navigate("/"); // Redirect to homepage or shop
>>>>>>> b501ffc (Pages)
=======
    navigate("/");
>>>>>>> 3f6e088 (Checkout/Cart)
=======
    navigate("/"); // Redirect to homepage or shop
>>>>>>> f8d2833 (Pages)
=======
    navigate("/");
>>>>>>> 0396ef7 (Checkout/Cart)
=======
    navigate("/"); // Redirect to homepage or shop
>>>>>>> 3e5b3f4 (Pages)
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> ea2b2a5 (edit shopping cart and checkout)
      <div className="checkout-content">
        {/* Payment and Billing Form */}
        <div className="checkout-form">
          <h3>Billing Information</h3>
          <form onSubmit={handleSubmit}>
            <label>Name<span>*</span>:</label>
            <input type="text" name="name" placeholder="Your Full Name" value={formData.name} onChange={handleChange} required />
<<<<<<< HEAD
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
=======
>>>>>>> ea2b2a5 (edit shopping cart and checkout)

            <label>Address<span>*</span>:</label>
            <input type="text" name="address" placeholder="Shipping Address" value={formData.address} onChange={handleChange} required />

<<<<<<< HEAD
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
=======
      <p>Enter your details to complete the purchase.</p>
      <form>
        <label>Name:</label>
        <input type="text" placeholder="Your Name" required />

        <label>Address:</label>
        <input type="text" placeholder="Your Address" required />

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        <label>Payment Method:</label>
        <select required>
>>>>>>> cbd676a (Pages)
=======
=======
>>>>>>> ff649c9 (Checkout/Cart)
=======
>>>>>>> c9bb840 (Checkout/Cart)
=======
>>>>>>> 3f6e088 (Checkout/Cart)
=======
>>>>>>> 0396ef7 (Checkout/Cart)
        <label htmlFor="payment">Payment Method:</label>
        <select
          id="payment"
          name="payment"
          value={formData.payment}
          onChange={handleChange}
          required
        >
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 90c915d (Checkout/Cart)
=======
        <label>Payment Method:</label>
        <select required>
>>>>>>> fd4e352 (Pages)
=======
>>>>>>> ff649c9 (Checkout/Cart)
=======
        <label>Payment Method:</label>
        <select required>
>>>>>>> 1d4ac54 (Pages)
=======
>>>>>>> c9bb840 (Checkout/Cart)
=======
        <label>Payment Method:</label>
        <select required>
>>>>>>> b501ffc (Pages)
=======
>>>>>>> 3f6e088 (Checkout/Cart)
=======
        <label>Payment Method:</label>
        <select required>
>>>>>>> f8d2833 (Pages)
=======
>>>>>>> 0396ef7 (Checkout/Cart)
=======
        <label>Payment Method:</label>
        <select required>
>>>>>>> 3e5b3f4 (Pages)
          <option>Credit Card</option>
          <option>PayPal</option>
          <option>Cash on Delivery</option>
        </select>

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        <button type="submit" className="confirm-btn">
=======
        <button type="submit" className="confirm-btn" onClick={handleCheckout}>
>>>>>>> 93241b1 (Pages)
=======
        <button type="submit" className="confirm-btn">
>>>>>>> 33d27ad (Checkout/Cart)
=======
        <button type="submit" className="confirm-btn" onClick={handleCheckout}>
>>>>>>> fd4e352 (Pages)
=======
        <button type="submit" className="confirm-btn">
>>>>>>> ff649c9 (Checkout/Cart)
=======
        <button type="submit" className="confirm-btn" onClick={handleCheckout}>
>>>>>>> 1d4ac54 (Pages)
=======
        <button type="submit" className="confirm-btn">
>>>>>>> c9bb840 (Checkout/Cart)
=======
        <button type="submit" className="confirm-btn" onClick={handleCheckout}>
>>>>>>> b501ffc (Pages)
=======
        <button type="submit" className="confirm-btn">
>>>>>>> 3f6e088 (Checkout/Cart)
=======
        <button type="submit" className="confirm-btn" onClick={handleCheckout}>
>>>>>>> f8d2833 (Pages)
=======
        <button type="submit" className="confirm-btn">
>>>>>>> 0396ef7 (Checkout/Cart)
=======
        <button type="submit" className="confirm-btn" onClick={handleCheckout}>
>>>>>>> 3e5b3f4 (Pages)
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

=======
            <label>Payment Method:</label>
            <select name="payment" value={formData.payment} onChange={handleChange} required>
              <option>Credit Card</option>
              <option>PayPal</option>
              <option>Cash on Delivery</option>
            </select>

>>>>>>> ea2b2a5 (edit shopping cart and checkout)
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
<<<<<<< HEAD
>>>>>>> 23ea5f4 (edit shopping cart and checkout)
=======
>>>>>>> ea2b2a5 (edit shopping cart and checkout)
=======
        <button type="submit" className="confirm-btn" onClick={handleCheckout}>
=======
        <button type="submit" className="confirm-btn">
>>>>>>> 90c915d (Checkout/Cart)
          Confirm Order
        </button>
      </form>
>>>>>>> cbd676a (Pages)
    </div>
  );
};

export default CheckoutPage;
