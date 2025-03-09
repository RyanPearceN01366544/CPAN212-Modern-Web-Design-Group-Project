<<<<<<< HEAD
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProductGrid from './components/product/ProductGrid';
import ProductFilter from './components/product/ProductFilter';
import ProductDetail from './components/product/ProductDetail';
import SignIn from './components/auth/SignIn';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
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
      <AuthProvider>
        <Router>
          <div className="app">
            <Navbar onSearch={handleSearch} />
            <main className="main-content">
              <Routes>
                <Route path="/" element={
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
                } />
                <Route path="/product/:id" element={
                  <ProductDetail />
                } />
                <Route path="/signin" element={
                  <SignIn />
                } />
                <Route path="/register" element={
                  <Register />
                } />
                <Route path="/forgot-password" element={
                  <ForgotPassword />
                } />
                <Route path="/reset-password/:token" element={
                  <ResetPassword />
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
>>>>>>> 01b19ea (created client template)
