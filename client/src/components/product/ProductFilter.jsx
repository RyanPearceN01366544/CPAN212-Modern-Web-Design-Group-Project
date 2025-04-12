import React, { useState } from 'react';
import { FaSort } from 'react-icons/fa';
import './ProductFilter.css';

const ProductFilter = ({ 
  onFilterChange,
  totalProducts 
}) => {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedRating, setSelectedRating] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const handlePriceChange = (type, value) => {
    const newPriceRange = { ...priceRange, [type]: value };
    setPriceRange(newPriceRange);
    onFilterChange({ priceRange: newPriceRange, rating: selectedRating, sortBy });
  };

  const handleRatingChange = (value) => {
    const newRating = value === selectedRating ? '' : value;
    setSelectedRating(newRating);
    onFilterChange({ 
      priceRange, 
      rating: newRating ? parseFloat(newRating) : '', 
      sortBy 
    });
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
        <div className="filter-left">
          <h2>Filters</h2>
          <span className="results-count">
            {totalProducts} Products
          </span>
        </div>
        <button className="reset-button" onClick={handleReset}>
          Reset All
        </button>
      </div>

      <div className="filter-section">
        <div className="filter-group">
          <FaSort className="control-icon" />
          <select 
            value={sortBy} 
            onChange={(e) => handleSortChange(e.target.value)}
            className="filter-select"
          >
            <option value="featured">Featured</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="filter-section">
        <h3>Price Range</h3>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => handlePriceChange('min', e.target.value)}
            min="0"
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => handlePriceChange('max', e.target.value)}
            min="0"
          />
        </div>
      </div>

      <div className="filter-section">
        <h3>Rating</h3>
        <div className="rating-buttons">
          {[5, 4, 3, 2, 1].map(stars => (
            <button
              key={stars}
              className={`rating-button ${selectedRating === stars.toString() ? 'active' : ''}`}
              onClick={() => handleRatingChange(stars.toString())}
            >
              {stars}★ & Up
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
