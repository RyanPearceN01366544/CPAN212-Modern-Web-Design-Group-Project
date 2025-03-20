import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import { getProducts, getProductsByCategory } from '../../services/api';
import './ProductGrid.css';

const ProductGrid = ({ selectedCategory, searchResults, filters }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products when category or search changes
  useEffect(() => {
    const fetchProducts = async () => {
      if (searchResults !== null) {
        setProducts(searchResults);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        let data;
        if (selectedCategory) {
          data = await getProductsByCategory(selectedCategory);
        } else {
          data = await getProducts();
        }
        
        if (data && Array.isArray(data)) {
          setProducts(data);
        } else {
          setError('Invalid data received from server');
        }
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchResults]);

  // Apply filters and sorting to products
  const getFilteredAndSortedProducts = () => {
    let filteredProducts = [...products];

    // Apply price filter
    if (filters.priceRange.min || filters.priceRange.max) {
      filteredProducts = filteredProducts.filter(product => {
        const price = product.price;
        const min = filters.priceRange.min ? parseFloat(filters.priceRange.min) : 0;
        const max = filters.priceRange.max ? parseFloat(filters.priceRange.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    // Apply rating filter
    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      filteredProducts = filteredProducts.filter(product => 
        product.rating >= minRating
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price_asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default: // 'featured' - sort by id as default
        filteredProducts.sort((a, b) => a.id - b.id);
    }

    return filteredProducts;
  };

  const filteredAndSortedProducts = getFilteredAndSortedProducts();

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="product-grid-container">
      {selectedCategory && (
        <div className="category-title">
          <h2>{selectedCategory}</h2>
        </div>
      )}
      {searchResults !== null && (
        <div className="search-results-info">
          <h2>Search Results ({filteredAndSortedProducts.length} items)</h2>
        </div>
      )}
      <div className="product-grid">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : filteredAndSortedProducts.length === 0 ? (
          <div className="no-products-message">
            {searchResults !== null
              ? 'No products found matching your search and filters.'
              : selectedCategory
                ? `No products found in ${selectedCategory} category with current filters.`
                : 'No products found with current filters.'}
          </div>
        ) : (
          filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
