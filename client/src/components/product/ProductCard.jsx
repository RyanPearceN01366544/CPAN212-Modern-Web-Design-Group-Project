import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaShoppingCart } from 'react-icons/fa';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const {
    image,
    title,
    price,
    originalPrice,
    rating,
    reviews,
    inStock,
    freeShipping,
    id
  } = product;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="star filled" />
        ) : (
          <FaRegStar key={i} className="star" />
        )
      );
    }
    return stars;
  };

  return (
    <Link to={`/product/${id}`} className="product-card">
      <div className="product-image-container">
        <img src={image} alt={title} className="product-image" />
      </div>

      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        
        <div className="price-row">
          <span className="current-price">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="original-price">${originalPrice.toFixed(2)}</span>
          )}
        </div>

        <div className="rating-row">
          <div className="stars">{renderStars(rating)}</div>
          <span className="review-count">({reviews})</span>
        </div>

        <div className="shipping-info-container">
          {freeShipping ? (
            <div className="shipping-info">Free Shipping</div>
          ) : (
            <div className="shipping-info-placeholder"></div>
          )}
        </div>

        <div className="product-actions">
          {inStock ? (
            <button className="add-to-cart-btn">
              <span className="cart-icon"><FaShoppingCart /></span>
              Add to Cart
            </button>
          ) : (
            <button className="out-of-stock-btn">
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
