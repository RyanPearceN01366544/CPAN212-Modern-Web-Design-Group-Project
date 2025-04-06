import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import { useCart } from "../context/CartContext";
import { FaCcVisa, FaCcMastercard, FaPaypal } from "react-icons/fa"; // Payment icons
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"; // Import PayPal button

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();

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
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="progress-bar">
        <div className={`progress ${currentStep === 1 ? "active" : ""}`}></div>
        <div className={`progress ${currentStep === 2 ? "active" : ""}`}></div>
        <div className={`progress ${currentStep === 3 ? "active" : ""}`}></div>
        <div className={`progress ${currentStep === 4 ? "active" : ""}`}></div>
      </div>
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
    </div>
  );
};

export default CheckoutPage;
