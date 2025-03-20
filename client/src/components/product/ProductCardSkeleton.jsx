import React from 'react';
import './ProductCardSkeleton.css';

const ProductCardSkeleton = () => {
  return (
    <div className="product-card skeleton">
      <div className="product-image-container skeleton-image">
        <div className="skeleton-animation"></div>
      </div>
      <div className="product-info">
        <div className="skeleton-title">
          <div className="skeleton-animation"></div>
        </div>
        <div className="skeleton-title" style={{ width: '70%' }}>
          <div className="skeleton-animation"></div>
        </div>
        <div className="skeleton-price">
          <div className="skeleton-animation"></div>
        </div>
        <div className="skeleton-rating">
          <div className="skeleton-animation"></div>
        </div>
        <div className="skeleton-button">
          <div className="skeleton-animation"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
