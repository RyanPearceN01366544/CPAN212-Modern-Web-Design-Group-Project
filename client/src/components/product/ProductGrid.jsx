import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import { getProducts } from '../../services/api';
import './ProductGrid.css';

const ProductGrid = ({ selectedCategory, searchResults, filters, onTotalProductsChange }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Fetch products when category or search changes
  useEffect(() => {
    const fetchProducts = async () => {
      if (searchResults !== null) {
        setProducts(searchResults.products || []);
        setTotalPages(searchResults.totalPages || 1);
        setCurrentPage(searchResults.currentPage || 1);
        setTotalProducts(searchResults.totalProducts || 0);
        onTotalProductsChange(searchResults.totalProducts || 0);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const queryParams = {
          page: currentPage,
          limit: 20,
          ...(selectedCategory && { category: selectedCategory }),
          ...(filters.rating && { rating: filters.rating })
        };
        
        const response = await getProducts(queryParams);
        
        if (response && response.products) {
          setProducts(response.products);
          setTotalPages(response.totalPages);
          setCurrentPage(response.currentPage);
          setTotalProducts(response.totalProducts);
          onTotalProductsChange(response.totalProducts);
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
  }, [selectedCategory, searchResults, currentPage, filters, onTotalProductsChange]);

  // Apply filters and sorting to products
  const getFilteredAndSortedProducts = () => {
    let filteredProducts = [...products];

    // Apply price range filter
    if (filters.priceRange.min !== '' || filters.priceRange.max !== '') {
      filteredProducts = filteredProducts.filter(product => {
        const price = product.price;
        const min = filters.priceRange.min === '' ? 0 : parseFloat(filters.priceRange.min);
        const max = filters.priceRange.max === '' ? Infinity : parseFloat(filters.priceRange.max);
        return price >= min && price <= max;
      });
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
        filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default: // 'featured'
        break;
    }

    return filteredProducts;
  };

  const displayProducts = getFilteredAndSortedProducts();

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  if (loading) {
    return (
      <div className="product-grid">
        {[...Array(8)].map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="product-grid-container">
      <div className="product-grid">
        {displayProducts.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>
          
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}
      
      <div className="product-count">
        Showing {displayProducts.length} of {totalProducts} products
      </div>
    </div>
  );
};

export default ProductGrid;
