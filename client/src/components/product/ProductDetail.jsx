import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaRegStar, FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa';
import { getProductById } from '../../services/api';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProductById(id);
      if (productData) {
        setProduct(productData);
      }
    };

    fetchProduct();
  }, [id]);

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
            <span className="review-count">({product.reviews} reviews)</span>
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

          <div className="product-specifications">
            <h2>Specifications</h2>
            <div className="specs-grid">
              {product.specifications.map((spec, index) => (
                <div key={index} className="spec-item">
                  <span className="spec-label">{spec.label}:</span>
                  <span className="spec-value">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <button onClick={() => handleQuantityChange(-1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>

            <button 
              className={`add-to-cart-btn ${!product.inStock ? 'out-of-stock' : ''}`}
              disabled={!product.inStock}
            >
              <FaShoppingCart />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            <button 
              className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              {isWishlisted ? <FaHeart /> : <FaRegHeart />}
              {isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
