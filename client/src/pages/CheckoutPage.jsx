import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import { useCart } from "../context/CartContext";
import { FaCcVisa, FaCcMastercard, FaPaypal } from "react-icons/fa";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { state, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    payment: "Credit Card",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
    shippingMethod: "standard"
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();

    // Validate shipping info
    if (currentStep === 1) {
      if (!formData.name || !formData.address) {
        setErrors({
          ...errors,
          name: !formData.name ? "Name is required" : "",
          address: !formData.address ? "Address is required" : ""
        });
        return;
      }
    }

    // Validate delivery method
    if (currentStep === 2) {
      if (!formData.shippingMethod) {
        setErrors({
          ...errors,
          shippingMethod: "Please select a shipping method"
        });
        return;
      }
    }

    // Validate payment
    if (currentStep === 3) {
      if (formData.payment === "Credit Card") {
        if (!validateCardDetails()) {
          return;
        }
      }
    }

    // Handle final submission
    if (currentStep === 4) {
      if (
        !formData.name ||
        !formData.address ||
        !formData.shippingMethod ||
        (formData.payment === "Credit Card" &&
          (!formData.cardNumber || !formData.cardExpiry || !formData.cardCVV))
      ) {
        alert("Please fill out all required fields.");
        return;
      }

      if (formData.payment === "Credit Card" && !validateCardDetails()) {
        return;
      }

      if (formData.payment === "Credit Card") {
        alert("Thank you for your purchase! Your card has been charged.");
        clearCart();
        navigate("/order-success");
      }

      return; // Stop here for PayPal — it's handled asynchronously
    }

    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = (e) => {
    e.preventDefault();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateCardDetails = () => {
    let valid = true;
    const newErrors = {};

    const cardNumberRegex = /^[0-9]{16}$/;
    if (!cardNumberRegex.test(formData.cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits.";
      valid = false;
    }

    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryDateRegex.test(formData.cardExpiry)) {
      newErrors.cardExpiry = "Expiration must be in MM/YY format.";
      valid = false;
    }

    const cvvRegex = /^[0-9]{3}$/;
    if (!cvvRegex.test(formData.cardCVV)) {
      newErrors.cardCVV = "CVV must be 3 digits.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const getCartTotal = () => {
    return state.cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
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
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
            <label>Address<span>*</span>:</label>
            <input
              type="text"
              name="address"
              placeholder="Shipping Address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <p className="error-text">{errors.address}</p>}
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <h3>Delivery Method</h3>
            <label>Select Delivery Option:</label>
            <select 
              name="shippingMethod"
              value={formData.shippingMethod}
              onChange={handleChange}
            >
              <option value="standard">Standard Shipping ($5.00)</option>
              <option value="express">Express Shipping ($15.00)</option>
              <option value="same-day">Same-Day Delivery ($25.00)</option>
            </select>
            {errors.shippingMethod && <p className="error-text">{errors.shippingMethod}</p>}
          </div>
        );
      case 3:
        return (
          <div className="step-content">
            <h3>Payment Method</h3>
            <div className="payment-method">
              <div 
                className={`payment-option ${formData.payment === "Credit Card" ? "active" : ""}`}
                onClick={() => setFormData({ ...formData, payment: 'Credit Card' })}
              >
                <input
                  type="radio"
                  name="payment"
                  value="Credit Card"
                  checked={formData.payment === "Credit Card"}
                  onChange={handleChange}
                />
                <div className="payment-option-content">
                  <FaCcVisa size={28} color="#1A1F71" />
                  <FaCcMastercard size={28} color="#EB001B" />
                  <span>Credit/Debit Card</span>
                </div>
              </div>
              <div 
                className={`payment-option ${formData.payment === "PayPal" ? "active" : ""}`}
                onClick={() => setFormData({ ...formData, payment: 'PayPal' })}
              >
                <input
                  type="radio"
                  name="payment"
                  value="PayPal"
                  checked={formData.payment === "PayPal"}
                  onChange={handleChange}
                />
                <div className="payment-option-content">
                  <FaPaypal size={28} color="#003087" />
                  <span>PayPal</span>
                </div>
              </div>
            </div>

            {formData.payment === "Credit Card" && (
              <div className="card-details">
                <div>
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleChange}
                  />
                  {errors.cardNumber && <p className="error-text">{errors.cardNumber}</p>}
                </div>

                <div>
                  <label>Expiry (MM/YY)</label>
                  <input
                    type="text"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    value={formData.cardExpiry}
                    onChange={handleChange}
                  />
                  {errors.cardExpiry && <p className="error-text">{errors.cardExpiry}</p>}
                </div>

                <div>
                  <label>CVV</label>
                  <input
                    type="text"
                    name="cardCVV"
                    placeholder="123"
                    value={formData.cardCVV}
                    onChange={handleChange}
                  />
                  {errors.cardCVV && <p className="error-text">{errors.cardCVV}</p>}
                </div>
              </div>
            )}

            {formData.payment === "PayPal" && (
              <div className="paypal-button-container">
                <PayPalScriptProvider options={{ "client-id": "test" }}>
                  <PayPalButtons
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
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        clearCart();
                        navigate("/order-success");
                      });
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            )}
          </div>
        );
      case 4:
        const subtotal = getCartTotal();
        const shippingCost = 
          formData.shippingMethod === "express" ? 15.00 : 
          formData.shippingMethod === "same-day" ? 25.00 : 
          5.00;
        const total = subtotal + shippingCost;

        return (
          <div className="step-content">
            <h3>Review Your Order</h3>
            <div className="order-summary">
              <div className="summary-item">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-item">
                <span>Shipping:</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="summary-item total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="order-details">
                <h4>Shipping Details</h4>
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Address:</strong> {formData.address}</p>
                <p><strong>Shipping Method:</strong> {formData.shippingMethod.charAt(0).toUpperCase() + formData.shippingMethod.slice(1)} Shipping</p>
                <p><strong>Payment Method:</strong> {formData.payment}</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="progress-bar">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className={`progress ${currentStep >= step ? "active" : ""}`}></div>
        ))}
      </div>

      <form onSubmit={handleNextStep}>
        {renderStep()}

        <div className="button-container">
          {currentStep > 1 && (
            <button type="button" className="back-btn" onClick={handlePreviousStep}>
              Go Back
            </button>
          )}
          {formData.payment !== "PayPal" && (
            <button type="submit" className="confirm-btn">
              {currentStep === 4 ? "Place Your Order" : "Continue Checkout"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
