import React, { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CategoryNav from './components/layout/CategoryNav';
import ProductGrid from './components/product/ProductGrid';
import ProductFilter from './components/product/ProductFilter';
import { searchProducts } from './services/api';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [filters, setFilters] = useState({
    priceRange: { min: '', max: '' },
    rating: '',
    sortBy: 'featured'
  });

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchResults(null); // Clear search results when category changes
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }
    
    try {
      const results = await searchProducts(query);
      setSearchResults(results);
      setSelectedCategory(null); // Clear category when searching
    } catch (error) {
      console.error('Search failed:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="app">
      <Header onSearch={handleSearch} />
      <CategoryNav onCategorySelect={handleCategorySelect} />
      <main className="main-content">
        <div className="content-wrapper">
          <aside className="filter-sidebar">
            <ProductFilter onFilterChange={handleFilterChange} />
          </aside>
          <div className="product-content">
            <ProductGrid 
              selectedCategory={selectedCategory}
              searchResults={searchResults}
              filters={filters}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
