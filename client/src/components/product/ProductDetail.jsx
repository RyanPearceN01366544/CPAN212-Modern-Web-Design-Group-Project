import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar, FaRegStar, FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa';
import { getProductById } from '../../services/api';
import { useCart } from '../../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const {addToCart} = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProductById(id);
      if (productData) {
        setProduct(productData);
      }
      else{
        console.log("Failed to get product! Return: " + productData);
      }
    };

    fetchProduct();
  }, [id]);

  const addProductToCart = (product, quantity) => {
    if (localStorage.getItem('user')) {
      const userData_ = JSON.parse(localStorage.getItem('user'));
      if (userData_.token){
        addToCart(product, quantity);
        return;
      }
    }
    navigate("/login")
  }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className="star">
          {i <= Math.floor(rating) ? <FaStar /> : <FaRegStar />}
        </span>
      );
    }
    return stars;
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (!product) {
    return <div className="product-detail-loading">Loading...</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-detail-grid">
        <div className="product-images">
          <div className="main-image">
            <img src={product.images[selectedImage]} alt={product.title} />
          </div>
          <div className="image-thumbnails">
            {product.images.map((image, index) => (
              <div 
                key={index}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`${product.title} view ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          
          <div className="product-rating">
            <div className="stars">{renderStars(product.rating)}</div>
          </div>

          <div className="product-price">
            <span className="current-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          {product.freeShipping && (
            <div className="shipping-info">
              <span>✓ Free Shipping</span>
            </div>
          )}

          <div className="product-description">
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <button onClick={() => handleQuantityChange(-1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>

            <button 
              className={`add-to-cart-btn ${product.itemsLeft <= 0 ? 'out-of-stock' : ''}`}
              disabled={product.itemsLeft <= 0}
              onClick={() => addProductToCart(product, quantity)}
            >
              <FaShoppingCart />
              {product.itemsLeft > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
