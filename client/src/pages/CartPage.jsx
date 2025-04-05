<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Import CartContext
import "./Cart.css";

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
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Import CartContext
import "./Cart.css";

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

const CartPage = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "Product 1", price: 20, quantity: 1 },
    { id: 2, name: "Product 2", price: 35, quantity: 1 },
  ]);
>>>>>>> fd4e352 (Pages)
=======
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const CartPage = ({ cart = [], setCart = () => {} }) => {
>>>>>>> ff649c9 (Checkout/Cart)
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
  const navigate = useNavigate();

>>>>>>> 23ea5f4 (edit shopping cart and checkout)
=======
const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

>>>>>>> ea2b2a5 (edit shopping cart and checkout)
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
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
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <span>{item.name}</span>
                <span>${item.price} x {item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
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
        </>
      )}
    </div>
  );
};

export default CartPage;
