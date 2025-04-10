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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import React from "react";
=======
import React, { useState } from "react";
>>>>>>> 6512b4d (semi final part)
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Import CartContext
import "./Cart.css"; // Assuming Cart.css includes updated styles

<<<<<<< HEAD
const CartPage = ({ cart = [], setCart = () => {} }) => {
=======
=======
>>>>>>> cbd676a (Pages)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const CartPage = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "Product 1", price: 20, quantity: 1 },
    { id: 2, name: "Product 2", price: 35, quantity: 1 },
  ]);
<<<<<<< HEAD
>>>>>>> 93241b1 (Pages)
=======
import React from "react";
=======
import React, { useState } from "react";
>>>>>>> 4f9e431 (semi final part)
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Import CartContext
import "./Cart.css"; // Assuming Cart.css includes updated styles

<<<<<<< HEAD
const CartPage = ({ cart = [], setCart = () => {} }) => {
>>>>>>> 33d27ad (Checkout/Cart)
=======
>>>>>>> cbd676a (Pages)
=======
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const CartPage = ({ cart = [], setCart = () => {} }) => {
>>>>>>> 90c915d (Checkout/Cart)
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

>>>>>>> 1d4ac54 (Pages)
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

>>>>>>> b501ffc (Pages)
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

>>>>>>> f8d2833 (Pages)
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

>>>>>>> 3e5b3f4 (Pages)
const CartPage = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "Product 1", price: 20, quantity: 1 },
    { id: 2, name: "Product 2", price: 35, quantity: 1 },
  ]);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> fd4e352 (Pages)
=======
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const CartPage = ({ cart = [], setCart = () => {} }) => {
>>>>>>> ff649c9 (Checkout/Cart)
=======
>>>>>>> 1d4ac54 (Pages)
=======
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const CartPage = ({ cart = [], setCart = () => {} }) => {
>>>>>>> c9bb840 (Checkout/Cart)
=======
>>>>>>> b501ffc (Pages)
=======
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const CartPage = ({ cart = [], setCart = () => {} }) => {
>>>>>>> 3f6e088 (Checkout/Cart)
=======
>>>>>>> f8d2833 (Pages)
=======
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const CartPage = ({ cart = [], setCart = () => {} }) => {
>>>>>>> 0396ef7 (Checkout/Cart)
=======
>>>>>>> 3e5b3f4 (Pages)
=======
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const CartPage = ({ cart = [], setCart = () => {} }) => {
>>>>>>> b4aeccb (Checkout/Cart)
  const navigate = useNavigate();

  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
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
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
=======
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
>>>>>>> 93241b1 (Pages)
=======
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
>>>>>>> 33d27ad (Checkout/Cart)
=======
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
>>>>>>> cbd676a (Pages)
=======
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
>>>>>>> 90c915d (Checkout/Cart)
=======
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
>>>>>>> fd4e352 (Pages)
=======
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
>>>>>>> ff649c9 (Checkout/Cart)
=======
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
>>>>>>> 1d4ac54 (Pages)
=======
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
>>>>>>> c9bb840 (Checkout/Cart)
=======
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
>>>>>>> b501ffc (Pages)
=======
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
>>>>>>> 3f6e088 (Checkout/Cart)
=======
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
>>>>>>> f8d2833 (Pages)
=======
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
>>>>>>> 0396ef7 (Checkout/Cart)
=======
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
>>>>>>> 3e5b3f4 (Pages)
=======
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
>>>>>>> b4aeccb (Checkout/Cart)
      )
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

<<<<<<< HEAD
=======
const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [shippingOption, setShippingOption] = useState("standard");
  const [discountApplied, setDiscountApplied] = useState(false);
  const navigate = useNavigate();

<<<<<<< HEAD
>>>>>>> 23ea5f4 (edit shopping cart and checkout)
=======
const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [shippingOption, setShippingOption] = useState("standard");
  const [discountApplied, setDiscountApplied] = useState(false);
  const navigate = useNavigate();

<<<<<<< HEAD
>>>>>>> ea2b2a5 (edit shopping cart and checkout)
=======
=======
>>>>>>> 4f9e431 (semi final part)
=======
=======
>>>>>>> 8f97ca3948dd4581105e40dc27f7c7dc2e44be15
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

<<<<<<< HEAD
>>>>>>> 26850c4 (semi final part)
=======
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

>>>>>>> 8e6e1e9 (semi final part)
=======
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

>>>>>>> 24f0de6 (semi final part)
=======
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

>>>>>>> 2d3ca2d (semi final part)
=======
>>>>>>> 8f97ca3948dd4581105e40dc27f7c7dc2e44be15
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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 6512b4d (semi final part)
  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
<<<<<<< HEAD
=======
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
>>>>>>> cbd676a (Pages)
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
<<<<<<< HEAD
=======
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
>>>>>>> 6512b4d (semi final part)
=======
=======
>>>>>>> 8f97ca3948dd4581105e40dc27f7c7dc2e44be15
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
<<<<<<< HEAD
>>>>>>> 4f9e431 (semi final part)
=======
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
>>>>>>> 26850c4 (semi final part)
=======
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
>>>>>>> 8e6e1e9 (semi final part)
=======
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
>>>>>>> 24f0de6 (semi final part)
=======
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
>>>>>>> 2d3ca2d (semi final part)
=======
>>>>>>> 8f97ca3948dd4581105e40dc27f7c7dc2e44be15
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          <h3>Total: ${getCartTotal().toFixed(2)}</h3>
=======
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <span>{item.name}</span>
                <span>${item.price} x {item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: ${getTotal()}</h3>
>>>>>>> cbd676a (Pages)
          <button className="checkout-btn" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
=======
=======
>>>>>>> 4f9e431 (semi final part)
=======
>>>>>>> 26850c4 (semi final part)
=======
>>>>>>> 8e6e1e9 (semi final part)
=======
>>>>>>> 24f0de6 (semi final part)
=======
>>>>>>> 2d3ca2d (semi final part)
=======
>>>>>>> 8f97ca3948dd4581105e40dc27f7c7dc2e44be15

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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 6512b4d (semi final part)
=======
>>>>>>> 4f9e431 (semi final part)
=======
>>>>>>> 26850c4 (semi final part)
=======
>>>>>>> 8e6e1e9 (semi final part)
=======
>>>>>>> 24f0de6 (semi final part)
=======
>>>>>>> 2d3ca2d (semi final part)
=======
>>>>>>> 8f97ca3948dd4581105e40dc27f7c7dc2e44be15
        </>
      )}
    </div>
  );
};

export default CartPage;
