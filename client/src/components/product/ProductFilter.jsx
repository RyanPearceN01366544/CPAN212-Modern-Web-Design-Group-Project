import React, { useState } from 'react';
import './ProductFilter.css';

const ProductFilter = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedRating, setSelectedRating] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const handlePriceChange = (type, value) => {
    const newPriceRange = { ...priceRange, [type]: value };
    setPriceRange(newPriceRange);
    onFilterChange({ priceRange: newPriceRange, rating: selectedRating, sortBy });
  };

  const handleRatingChange = (value) => {
    setSelectedRating(value);
    onFilterChange({ priceRange, rating: value, sortBy });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onFilterChange({ priceRange, rating: selectedRating, sortBy: value });
  };

  const handleReset = () => {
    setPriceRange({ min: '', max: '' });
    setSelectedRating('');
    setSortBy('featured');
    onFilterChange({
      priceRange: { min: '', max: '' },
      rating: '',
      sortBy: 'featured'
    });
  };

  return (
    <div className="product-filter">
      <div className="filter-header">
        <h2>Filters</h2>
        <button className="reset-button" onClick={handleReset}>
          Reset All
        </button>
      </div>

      <div className="filter-section">
        <h3>Sort By</h3>
        <select 
          value={sortBy} 
          onChange={(e) => handleSortChange(e.target.value)}
          className="filter-select"
        >
          <option value="featured">Featured</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Best Rating</option>
        </select>
      </div>

      <div className="filter-section">
        <h3>Price Range</h3>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => handlePriceChange('min', e.target.value)}
            className="price-input"
            min="0"
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => handlePriceChange('max', e.target.value)}
            className="price-input"
            min="0"
          />
        </div>
      </div>

      <div className="filter-section">
        <h3>Rating</h3>
        <div className="rating-options">
          {[5, 4, 3, 2, 1].map((stars) => (
            <label key={stars} className="rating-option">
              <input
                type="radio"
                name="rating"
                value={stars}
                checked={selectedRating === stars.toString()}
                onChange={(e) => handleRatingChange(e.target.value)}
              />
              <span>
                {'★'.repeat(stars)}{'☆'.repeat(5-stars)} & Up
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
