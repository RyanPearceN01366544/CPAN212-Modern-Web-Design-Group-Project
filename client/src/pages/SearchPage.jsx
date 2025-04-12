import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { searchProducts } from '../services/api';
import './SearchPage.css';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState({ products: [], totalPages: 0, currentPage: 1, totalProducts: 0 });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Effect to handle new searches and location changes
  useEffect(() => {
    const storedQuery = localStorage.getItem('searchQuery');
    const storedResults = JSON.parse(localStorage.getItem('searchResults') || '{}');
    
    if (storedQuery) {
      setSearchQuery(storedQuery);
      setSearchResults(storedResults);
      setCurrentPage(1); // Reset to first page on new search
    }
    
    setLoading(false);
  }, [location.key]); // Re-run when location changes (new search)

  const handlePageChange = async (newPage) => {
    if (newPage >= 1 && newPage <= searchResults.totalPages) {
      setLoading(true);
      try {
        const results = await searchProducts({ name: searchQuery }, newPage);
        setSearchResults(results);
        setCurrentPage(newPage);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="search-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="search-page">
      <div className="search-header">
        <h2>Search Results for "{searchQuery}"</h2>
        <p className="results-count">
          Found {searchResults.totalProducts} products
        </p>
      </div>

      {searchResults.products.length === 0 ? (
        <div className="no-results">
          <p>No products found. Try a different search term.</p>
          <Link to="/" className="back-home">
            Back to Home
          </Link>
        </div>
      ) : (
        <>
          <div className="search-results">
            {searchResults.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {searchResults.totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                Previous
              </button>
              
              <span className="page-info">
                Page {currentPage} of {searchResults.totalPages}
              </span>
              
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === searchResults.totalPages}
                className="pagination-button"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
