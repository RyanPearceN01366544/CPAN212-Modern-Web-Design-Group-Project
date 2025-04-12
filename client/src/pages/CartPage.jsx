import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

const CartPage = () => {
  const { state, updateQuantity, removeFromCart } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [shippingOption, setShippingOption] = useState("standard");
  const [discountApplied, setDiscountApplied] = useState(false);
  const navigate = useNavigate();

  const handleDiscountApply = () => {
    if (discountCode === "SAVE10") {
      setDiscountApplied(true);
    } else {
      alert("Invalid discount code");
    }
  };

  const handleShippingChange = (event) => {
    setShippingOption(event.target.value);
  };

  const shippingCost = shippingOption === "express" ? 15.00 : 5.00;
  
  const getCartSubtotal = () => {
    return state.cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
  };

  const subtotal = getCartSubtotal();
  const discount = discountApplied ? 10 : 0;
  const total = subtotal - discount + shippingCost;

  const handleQuantityUpdate = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>
      {state.cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty. Start shopping to fill it up!</p>
          <button onClick={() => navigate("/")} className="shop-more-btn">
            Shop Now
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {state.cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="item-info">
                  <img src={item.image} alt={item.title || item.name} className="item-image" />
                  <div className="item-details">
                    <h3>{item.title || item.name}</h3>
                    <p className="item-price">${Number(item.price).toFixed(2)}</p>
                  </div>
                </div>
                <div className="item-actions">
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityUpdate(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="quantity-btn"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityUpdate(item._id, item.quantity + 1)}
                      className="quantity-btn"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <p className="item-total">${(Number(item.price) * item.quantity).toFixed(2)}</p>
                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-sidebar">
            <div className="cart-options">
              <div className="shipping-options">
                <h3>Shipping Method</h3>
                <select id="shipping" value={shippingOption} onChange={handleShippingChange}>
                  <option value="standard">Standard Shipping ($5.00)</option>
                  <option value="express">Express Shipping ($15.00)</option>
                </select>
              </div>

              <div className="discount-section">
                <h3>Discount Code</h3>
                <div className="discount-input-group">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Enter code"
                    className="discount-input"
                  />
                  <button className="apply-discount" onClick={handleDiscountApply}>
                    Apply
                  </button>
                </div>
                {discountApplied && (
                  <p className="discount-applied">Discount applied: -$10.00</p>
                )}
              </div>
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountApplied && (
                <div className="summary-row discount">
                  <span>Discount:</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Shipping:</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button 
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
                disabled={state.cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;