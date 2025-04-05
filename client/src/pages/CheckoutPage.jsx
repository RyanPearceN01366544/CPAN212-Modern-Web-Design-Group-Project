import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const CheckoutPage = () => {
  const navigate = useNavigate();
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
    navigate("/");
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <p>Enter your details to complete the purchase.</p>
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
          <option>Credit Card</option>
          <option>PayPal</option>
          <option>Cash on Delivery</option>
        </select>

        <button type="submit" className="confirm-btn">
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
