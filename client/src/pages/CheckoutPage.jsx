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
import { FaCcVisa, FaCcMastercard, FaPaypal } from "react-icons/fa"; // Payment icons
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"; // Import PayPal button

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
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 23ea5f4 (edit shopping cart and checkout)
=======
  const { cartItems, getCartTotal, clearCart } = useCart();
>>>>>>> ea2b2a5 (edit shopping cart and checkout)
=======

>>>>>>> 4f9e431 (semi final part)
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    payment: "Credit Card",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
  });

  const [currentStep, setCurrentStep] = useState(1); // 1 = Shipping, 2 = Delivery, 3 = Payment, 4 = Review
  const [errors, setErrors] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
  });
<<<<<<< HEAD

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();

    // If the user is on the final step (step 4), process the payment.
    if (currentStep === 4) {
      // Validate form data for all steps
      if (!formData.name || !formData.address || (formData.payment === "Credit Card" && (!formData.cardNumber || !formData.cardExpiry || !formData.cardCVV))) {
        alert("Please fill out all required fields.");
        return;
      }
      if (formData.payment === "Credit Card" && !validateCardDetails()) {
        return;
      }

      // Process Credit Card Payment (Simulating Payment)
      if (formData.payment === "Credit Card") {
        alert("Thank you for your purchase! Your credit card has been charged.");
        clearCart();
        navigate("/order-success"); // Redirect to an order success page or homepage
      } 
      // Process PayPal Payment
      else {
        alert("Redirecting to PayPal for payment...");
      }
    } else {
      setCurrentStep(currentStep + 1); // Go to next step
    }
  };

  const handlePreviousStep = (e) => {
    e.preventDefault();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1); // Go to previous step
    }
  };

  const validateCardDetails = () => {
    let valid = true;
    const newErrors = {
      cardNumber: "",
      cardExpiry: "",
      cardCVV: "",
    };

    // Card Number Validation (16 digits)
    const cardNumberRegex = /^[0-9]{16}$/;
    if (!cardNumberRegex.test(formData.cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits.";
      valid = false;
    }

    // Expiry Date Validation (MM/YY)
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryDateRegex.test(formData.cardExpiry)) {
      newErrors.cardExpiry = "Expiration date must be in MM/YY format.";
      valid = false;
    }

    // CVV Validation (3 digits)
    const cvvRegex = /^[0-9]{3}$/;
    if (!cvvRegex.test(formData.cardCVV)) {
      newErrors.cardCVV = "CVV must be 3 digits.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: // Shipping
        return (
          <div className="step-content">
            <h3>Shipping Information</h3>
            <label>Name<span>*</span>:</label>
            <input 
              type="text" 
              name="name" 
              placeholder="Your Full Name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
            <label>Address<span>*</span>:</label>
            <input 
              type="text" 
              name="address" 
              placeholder="Shipping Address" 
              value={formData.address} 
              onChange={handleChange} 
              required 
            />
          </div>
        );
      case 2: // Delivery
        return (
          <div className="step-content">
            <h3>Delivery Method</h3>
            <label>Select Delivery Option:</label>
            <select>
              <option>Standard Shipping</option>
              <option>Express Shipping</option>
              <option>Same-Day Delivery</option>
            </select>
          </div>
        );
      case 3: // Payment
        return (
          <div className="step-content">
            <h3>Payment Method</h3>
            <div className="payment-method">
              <div className="payment-option" onClick={() => setFormData({ ...formData, payment: 'Credit Card' })}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="Credit Card" 
                  checked={formData.payment === "Credit Card"} 
                  onChange={handleChange} 
                  required 
                />
                <div className="payment-option-content">
                  <FaCcVisa size={30} color="#0055b8" />
                  <FaCcMastercard size={30} color="#ff5f00" />
                  <span>Credit/Debit Card</span>
                </div>
              </div>
              <div className="payment-option" onClick={() => setFormData({ ...formData, payment: 'PayPal' })}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="PayPal" 
                  checked={formData.payment === "PayPal"} 
                  onChange={handleChange} 
                  required 
                />
                <div className="payment-option-content">
                  <FaPaypal size={30} color="#003087" />
                  <span>PayPal</span>
                </div>
              </div>
            </div>

            {formData.payment === "Credit Card" && (
              <>
                <label>Card Number:</label>
                <input 
                  type="text" 
                  name="cardNumber" 
                  placeholder="Enter your card number" 
                  value={formData.cardNumber} 
                  onChange={handleChange} 
                  required 
                />
                {errors.cardNumber && <p className="error-text">{errors.cardNumber}</p>}

                <div className="card-details">
                  <label>Expiration Date (MM/YY):</label>
                  <input 
                    type="text" 
                    name="cardExpiry" 
                    placeholder="MM/YY" 
                    value={formData.cardExpiry} 
                    onChange={handleChange} 
                    required 
                  />
                  {errors.cardExpiry && <p className="error-text">{errors.cardExpiry}</p>}

                  <label>CVV:</label>
                  <input 
                    type="text" 
                    name="cardCVV" 
                    placeholder="Enter CVV" 
                    value={formData.cardCVV} 
                    onChange={handleChange} 
                    required 
                  />
                  {errors.cardCVV && <p className="error-text">{errors.cardCVV}</p>}
                </div>
              </>
            )}

            {formData.payment === "PayPal" && (
              <div className="paypal-button-container">
                {/* PayPal Buttons wrapped with PayPalScriptProvider */}
                <PayPalScriptProvider options={{ "client-id": "YOUR_CLIENT_ID" }}>
                  <PayPalButtons
                    style={{
                      layout: "vertical",
                      size: "responsive",
                      shape: "pill",
                      color: "blue",
                    }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: getCartTotal().toFixed(2),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      const details = await actions.order.capture();
                      alert("Transaction completed by " + details.payer.name.given_name);
                      clearCart();
                      navigate("/order-success"); // Navigate to a success page
                    }}
                    onError={(err) => {
                      alert("There was an error with your PayPal payment. Please try again.");
                      console.error("PayPal Error:", err);
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            )}
          </div>
        );
      case 4: // Review
        return (
          <div className="step-content">
            <h3>Review Your Order</h3>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className="order-item">
                  <span>{item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)} ({item.quantity})</span>
                </li>
              ))}
            </ul>
            <h3>Total: ${getCartTotal().toFixed(2)}</h3>
            <div>
              <h4>Shipping Information</h4>
              <p>{formData.name}</p>
              <p>{formData.address}</p>
            </div>
            <div>
              <h4>Payment Method</h4>
              <p>{formData.payment === "Credit Card" ? "Credit/Debit Card" : "PayPal"}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
<<<<<<< HEAD
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
=======
import React, { useState } from "react";
>>>>>>> b4aeccb (Checkout/Cart)
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const CheckoutPage = () => {
  const navigate = useNavigate();
=======

>>>>>>> 6512b4d (semi final part)
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    payment: "Credit Card",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
  });

  const [currentStep, setCurrentStep] = useState(1); // 1 = Shipping, 2 = Delivery, 3 = Payment, 4 = Review
  const [errors, setErrors] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();

    // If the user is on the final step (step 4), process the payment.
    if (currentStep === 4) {
      // Validate form data for all steps
      if (!formData.name || !formData.address || (formData.payment === "Credit Card" && (!formData.cardNumber || !formData.cardExpiry || !formData.cardCVV))) {
        alert("Please fill out all required fields.");
        return;
      }
      if (formData.payment === "Credit Card" && !validateCardDetails()) {
        return;
      }

      // Process Credit Card Payment (Simulating Payment)
      if (formData.payment === "Credit Card") {
        alert("Thank you for your purchase! Your credit card has been charged.");
        clearCart();
        navigate("/order-success"); // Redirect to an order success page or homepage
      } 
      // Process PayPal Payment
      else {
        alert("Redirecting to PayPal for payment...");
      }
    } else {
      setCurrentStep(currentStep + 1); // Go to next step
    }
  };

  const handlePreviousStep = (e) => {
    e.preventDefault();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1); // Go to previous step
    }
  };

  const validateCardDetails = () => {
    let valid = true;
    const newErrors = {
      cardNumber: "",
      cardExpiry: "",
      cardCVV: "",
    };

    // Card Number Validation (16 digits)
    const cardNumberRegex = /^[0-9]{16}$/;
    if (!cardNumberRegex.test(formData.cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits.";
      valid = false;
    }

    // Expiry Date Validation (MM/YY)
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryDateRegex.test(formData.cardExpiry)) {
      newErrors.cardExpiry = "Expiration date must be in MM/YY format.";
      valid = false;
    }

    // CVV Validation (3 digits)
    const cvvRegex = /^[0-9]{3}$/;
    if (!cvvRegex.test(formData.cardCVV)) {
      newErrors.cardCVV = "CVV must be 3 digits.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: // Shipping
        return (
          <div className="step-content">
            <h3>Shipping Information</h3>
            <label>Name<span>*</span>:</label>
            <input 
              type="text" 
              name="name" 
              placeholder="Your Full Name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
            <label>Address<span>*</span>:</label>
            <input 
              type="text" 
              name="address" 
              placeholder="Shipping Address" 
              value={formData.address} 
              onChange={handleChange} 
              required 
            />
          </div>
        );
      case 2: // Delivery
        return (
          <div className="step-content">
            <h3>Delivery Method</h3>
            <label>Select Delivery Option:</label>
            <select>
              <option>Standard Shipping</option>
              <option>Express Shipping</option>
              <option>Same-Day Delivery</option>
            </select>
          </div>
        );
      case 3: // Payment
        return (
          <div className="step-content">
            <h3>Payment Method</h3>
            <div className="payment-method">
              <div className="payment-option" onClick={() => setFormData({ ...formData, payment: 'Credit Card' })}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="Credit Card" 
                  checked={formData.payment === "Credit Card"} 
                  onChange={handleChange} 
                  required 
                />
                <div className="payment-option-content">
                  <FaCcVisa size={30} color="#0055b8" />
                  <FaCcMastercard size={30} color="#ff5f00" />
                  <span>Credit/Debit Card</span>
                </div>
              </div>
              <div className="payment-option" onClick={() => setFormData({ ...formData, payment: 'PayPal' })}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="PayPal" 
                  checked={formData.payment === "PayPal"} 
                  onChange={handleChange} 
                  required 
                />
                <div className="payment-option-content">
                  <FaPaypal size={30} color="#003087" />
                  <span>PayPal</span>
                </div>
              </div>
            </div>

            {formData.payment === "Credit Card" && (
              <>
                <label>Card Number:</label>
                <input 
                  type="text" 
                  name="cardNumber" 
                  placeholder="Enter your card number" 
                  value={formData.cardNumber} 
                  onChange={handleChange} 
                  required 
                />
                {errors.cardNumber && <p className="error-text">{errors.cardNumber}</p>}

                <div className="card-details">
                  <label>Expiration Date (MM/YY):</label>
                  <input 
                    type="text" 
                    name="cardExpiry" 
                    placeholder="MM/YY" 
                    value={formData.cardExpiry} 
                    onChange={handleChange} 
                    required 
                  />
                  {errors.cardExpiry && <p className="error-text">{errors.cardExpiry}</p>}

                  <label>CVV:</label>
                  <input 
                    type="text" 
                    name="cardCVV" 
                    placeholder="Enter CVV" 
                    value={formData.cardCVV} 
                    onChange={handleChange} 
                    required 
                  />
                  {errors.cardCVV && <p className="error-text">{errors.cardCVV}</p>}
                </div>
              </>
            )}

            {formData.payment === "PayPal" && (
              <div className="paypal-button-container">
                {/* PayPal Buttons wrapped with PayPalScriptProvider */}
                <PayPalScriptProvider options={{ "client-id": "YOUR_CLIENT_ID" }}>
                  <PayPalButtons
                    style={{
                      layout: "vertical",
                      size: "responsive",
                      shape: "pill",
                      color: "blue",
                    }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: getCartTotal().toFixed(2),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      const details = await actions.order.capture();
                      alert("Transaction completed by " + details.payer.name.given_name);
                      clearCart();
                      navigate("/order-success"); // Navigate to a success page
                    }}
                    onError={(err) => {
                      alert("There was an error with your PayPal payment. Please try again.");
                      console.error("PayPal Error:", err);
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            )}
          </div>
        );
      case 4: // Review
        return (
          <div className="step-content">
            <h3>Review Your Order</h3>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className="order-item">
                  <span>{item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)} ({item.quantity})</span>
                </li>
              ))}
            </ul>
            <h3>Total: ${getCartTotal().toFixed(2)}</h3>
            <div>
              <h4>Shipping Information</h4>
              <p>{formData.name}</p>
              <p>{formData.address}</p>
            </div>
            <div>
              <h4>Payment Method</h4>
              <p>{formData.payment === "Credit Card" ? "Credit/Debit Card" : "PayPal"}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
<<<<<<< HEAD
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
=======
    navigate("/");
>>>>>>> b4aeccb (Checkout/Cart)
=======
>>>>>>> 6512b4d (semi final part)
=======
>>>>>>> 4f9e431 (semi final part)
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> b4aeccb (Checkout/Cart)
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
=======
>>>>>>> b4aeccb (Checkout/Cart)
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
=======
        <button type="submit" className="confirm-btn">
>>>>>>> b4aeccb (Checkout/Cart)
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
=======
      <div className="progress-bar">
        <div className={`progress ${currentStep === 1 ? "active" : ""}`}></div>
        <div className={`progress ${currentStep === 2 ? "active" : ""}`}></div>
        <div className={`progress ${currentStep === 3 ? "active" : ""}`}></div>
        <div className={`progress ${currentStep === 4 ? "active" : ""}`}></div>
      </div>
=======
      <div className="progress-bar">
        <div className={`progress ${currentStep === 1 ? "active" : ""}`}></div>
        <div className={`progress ${currentStep === 2 ? "active" : ""}`}></div>
        <div className={`progress ${currentStep === 3 ? "active" : ""}`}></div>
        <div className={`progress ${currentStep === 4 ? "active" : ""}`}></div>
      </div>
>>>>>>> 4f9e431 (semi final part)
      <form onSubmit={handleNextStep}>
        {renderStep()}
        <div className="button-container">
          {currentStep > 1 && (
            <button type="button" className="back-btn" onClick={handlePreviousStep}>
              Go Back
            </button>
          )}
          <button type="submit" className="confirm-btn">
            {currentStep === 4 ? "Place Your Order" : "Continue Checkout"}
          </button>
        </div>
      </form>
<<<<<<< HEAD
>>>>>>> 6512b4d (semi final part)
=======
>>>>>>> 4f9e431 (semi final part)
    </div>
  );
};

export default CheckoutPage;
