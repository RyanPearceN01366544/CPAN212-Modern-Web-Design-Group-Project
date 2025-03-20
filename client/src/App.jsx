import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CategoryNav from './components/layout/CategoryNav';
import ProductGrid from './components/product/ProductGrid';
import ProductFilter from './components/product/ProductFilter';
import ProductDetail from './components/product/ProductDetail';
import SignIn from './components/auth/SignIn';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import { searchProducts } from './services/api';
import './App.css';

// Your Google OAuth client ID (you'll need to get this from Google Cloud Console)
const GOOGLE_CLIENT_ID = "986891372297-u48hn7248c8usahsl094udj57lnusp73.apps.googleusercontent.com";

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
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <div className="app">
          <Header onSearch={handleSearch} />
          <CategoryNav onCategorySelect={handleCategorySelect} />
          <Routes>
            <Route path="/" element={
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
            } />
            <Route path="/product/:id" element={
              <main className="main-content">
                <ProductDetail />
              </main>
            } />
            <Route path="/signin" element={
              <main className="main-content">
                <SignIn />
              </main>
            } />
            <Route path="/register" element={
              <main className="main-content">
                <Register />
              </main>
            } />
            <Route path="/forgot-password" element={
              <main className="main-content">
                <ForgotPassword />
              </main>
            } />
          </Routes>
          <Footer />
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
