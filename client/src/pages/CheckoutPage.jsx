import React from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    alert("Thank you for your purchase!");
    navigate("/"); // Redirect to homepage or shop
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <p>Enter your details to complete the purchase.</p>
      <form>
        <label>Name:</label>
        <input type="text" placeholder="Your Name" required />

        <label>Address:</label>
        <input type="text" placeholder="Your Address" required />

        <label>Payment Method:</label>
        <select required>
          <option>Credit Card</option>
          <option>PayPal</option>
          <option>Cash on Delivery</option>
        </select>

        <button type="submit" className="confirm-btn" onClick={handleCheckout}>
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
