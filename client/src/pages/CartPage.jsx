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
          <ul>
            {cartItems.map((item) => {
              return(
              <li key={item._id} className="cart-item">
                <span style={{color: "black"}}>{item.name}</span>
                <span style={{color: "black"}}>${item.price} x {item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            )})}
          </ul>

          {/* Shipping and Discount Section */}
          <div className="cart-options">
            <div className="shipping-options">
              <label style={{color: "black"}} htmlFor="shipping">Choose Shipping Method:</label>
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
              <h3 style={{color: "black"}} className="total-price">
                <p style={{color: "black"}}>Total:</p> <span style={{color: "black"}}>${totalAfterDiscount.toFixed(2)}</span>
              </h3>
              <h4 style={{color: "black"}} className="shipping-fee">
                <p style={{color: "black"}}>Shipping:</p> <span style={{color: "black"}}>${shippingCost.toFixed(2)}</span>
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