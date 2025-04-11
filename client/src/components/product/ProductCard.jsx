import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaShoppingCart } from 'react-icons/fa';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const {
    images,
    name,
    price,
    originalPrice,
    rating,
    itemsLeft,
    freeShipping,
    _id
  } = product;
  const inStock = itemsLeft > 0;
  console.log(product);

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
    <Link to={`/product/${_id}`} className="product-card">
      <div className="product-image-container">
        <img src={images[0]} alt={name} className="product-image" />
      </div>

      <div className="product-info">
        <h3 className="product-title">{name}</h3>
        
        <div className="price-row">
          <span className="current-price">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="original-price">${originalPrice.toFixed(2)}</span>
          )}
        </div>

        <div className="rating-row">
          <div className="stars">{renderStars(rating)}</div>
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
