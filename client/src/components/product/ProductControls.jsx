import React from 'react';
import { FaSort, FaFilter } from 'react-icons/fa';
import './ProductControls.css';

const ProductControls = ({ 
  sortBy, 
  onSortChange, 
  selectedCategory,
  onCategoryChange,
  categories,
  totalProducts 
}) => {
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest Arrivals' }
  ];

  return (
    <div className="product-controls">
      <div className="controls-left">
        <span className="results-count">
          {totalProducts} Products
        </span>
        {selectedCategory && (
          <span className="current-category">
            in {selectedCategory}
          </span>
        )}
      </div>
      
      <div className="controls-right">
        <div className="filter-group">
          <FaFilter className="control-icon" />
          <select 
            value={selectedCategory} 
            onChange={(e) => onCategoryChange(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <FaSort className="control-icon" />
          <select 
            value={sortBy} 
            onChange={(e) => onSortChange(e.target.value)}
            className="filter-select"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductControls;
