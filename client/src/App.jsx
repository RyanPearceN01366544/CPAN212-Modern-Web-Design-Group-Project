import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from "./context/CartContext"; // 
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
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import UserPage from './pages/UserPage'; 
import SearchPage from './pages/SearchPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import './App.css';

const GOOGLE_CLIENT_ID = "986891372297-u48hn7248c8usahsl094udj57lnusp73.apps.googleusercontent.com";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [filters, setFilters] = useState({
    priceRange: { min: '', max: '' },
    rating: '',
    sortBy: 'featured'
  });
  const [categories] = useState([
    'Shoes',
    'Apparel',
    'Accessories',
    'Electronics',
    'Toys & Games',
    'Home & Living',
    'Kitchen',
    'Jewelry',
    'Garden & Tools'
  ]);
  const [totalProducts, setTotalProducts] = useState(0);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchResults(null);
    setFilters(prevFilters => ({
      ...prevFilters,
      rating: '',
      sortBy: 'featured'
    }));
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }
    
    try {
      const results = await searchProducts(query);
      setSearchResults(results);
      setSelectedCategory(null); 
      setTotalProducts(results.totalProducts);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <CartProvider> 
          <Router>
            <div className="app">
              <Navbar onSearch={handleSearch} onCategorySelect={handleCategorySelect} />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={
                    <div className="content-wrapper">
                      <aside className="filter-sidebar">
                        <ProductFilter 
                          onFilterChange={handleFilterChange}
                          totalProducts={totalProducts}
                        />
                      </aside>
                      <div className="product-content">
                        <ProductGrid 
                          selectedCategory={selectedCategory}
                          searchResults={searchResults}
                          filters={filters}
                          onTotalProductsChange={setTotalProducts}
                        />
                      </div>
                    </div>
                  } />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/login" element={<SignIn />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password/:token" element={<ResetPassword />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/user" element={<UserPage />} />
                  <Route path="/order-success" element={<OrderSuccessPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App