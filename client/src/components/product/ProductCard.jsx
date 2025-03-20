import React, { useState } from 'react';
import { FaStar, FaRegStar, FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const {
    image,
    title,
    price,
    originalPrice,
    rating,
    reviews,
    inStock,
    freeShipping
  } = product;

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

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

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={image} alt={title} className="product-image" />
        <button 
          className="wishlist-button"
          onClick={toggleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? <FaHeart /> : <FaRegHeart />}
        </button>
        {discount > 0 && (
          <div className="discount-badge">-{discount}%</div>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        
        <div className="product-price">
          <span className="current-price">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="original-price">${originalPrice.toFixed(2)}</span>
          )}
        </div>

        <div className="product-rating">
          <div className="stars">{renderStars(rating)}</div>
          <span className="review-count">({reviews})</span>
        </div>

        {freeShipping && (
          <div className="shipping-info">Free Shipping</div>
        )}

        <div className="product-actions">
          <button 
            className={`add-to-cart-btn ${!inStock ? 'out-of-stock' : ''}`}
            disabled={!inStock}
          >
            <FaShoppingCart />
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
