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

const CheckoutPage = () => {
  const navigate = useNavigate();
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 33d27ad (Checkout/Cart)
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
    </div>
  );
};

export default CheckoutPage;
