<<<<<<< HEAD
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from "./context/CartContext"; // ✅ Added CartProvider
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
<<<<<<< HEAD
<<<<<<< HEAD
import UserPage from './pages/UserPage'; 
=======
>>>>>>> 93241b1 (Pages)
=======
import UserPage from './pages/UserPage'; 
>>>>>>> 33d27ad (Checkout/Cart)
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

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchResults(null); 
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
<<<<<<< HEAD
<<<<<<< HEAD
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
                 <Route path="/cart" element={
                  <CartPage/>
                } />
                 <Route path="/checkout" element={
                  <CheckoutPage/> 
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 33d27ad (Checkout/Cart)
                } />
                 <Route path="/user" element={
                  <UserPage />
                } /> 
<<<<<<< HEAD
=======
                 } />
>>>>>>> 93241b1 (Pages)
=======
>>>>>>> 33d27ad (Checkout/Cart)
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
=======
=======
>>>>>>> ea2b2a5 (edit shopping cart and checkout)
                  } />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/login" element={<SignIn />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password/:token" element={<ResetPassword />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/user" element={<UserPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
<<<<<<< HEAD
>>>>>>> 23ea5f4 (edit shopping cart and checkout)
=======
>>>>>>> ea2b2a5 (edit shopping cart and checkout)
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
