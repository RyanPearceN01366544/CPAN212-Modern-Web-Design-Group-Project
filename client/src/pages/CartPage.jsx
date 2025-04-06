import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Import CartContext
import "./Cart.css"; // Assuming Cart.css includes updated styles

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
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
  const totalAfterDiscount = discountApplied ? getCartTotal() - 10 : getCartTotal(); // Example discount of $10

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty. Start shopping to fill it up!</p>
          <button onClick={() => navigate("/")} className="shop-more-btn">
            Shop Now
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items List */}
          <ul className="cart-items-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="item-details">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">${item.price.toFixed(2)}</span>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="item-quantity">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button className="remove-btn" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                  Remove
                </button>

                {/* Item Subtotal */}
                <div className="item-subtotal">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>

          {/* Shipping and Discount Section */}
          <div className="cart-options">
            <div className="shipping-options">
              <label htmlFor="shipping">Choose Shipping Method:</label>
              <select id="shipping" value={shippingOption} onChange={handleShippingChange}>
                <option value="standard">Standard Shipping ($5.00)</option>
                <option value="express">Express Shipping ($15.00)</option>
              </select>
            </div>

            <div className="discount-section">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Enter Discount Code"
                className="discount-input"
              />
              <button className="apply-discount" onClick={handleDiscountApply}>
                Apply
              </button>
              {discountApplied && <p className="discount-applied">Discount applied: $10.00</p>}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <div className="cart-summary-details">
              <h3 className="total-price">
                Total: <span>${totalAfterDiscount.toFixed(2)}</span>
              </h3>
              <h4 className="shipping-fee">
                Shipping: <span>${shippingCost.toFixed(2)}</span>
              </h4>
              <button className="checkout-btn" onClick={() => navigate("/checkout")}>
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
