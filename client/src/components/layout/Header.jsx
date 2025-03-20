import React, { useState } from 'react';
import './Header.css';

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <header className="header">
      <div className="logo-container">
        <h1>ShopEase</h1>
      </div>
      
      <div className="search-container">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Search products..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>

      <div className="account-container">
        <button className="account-button">
          <span className="account-icon">👤</span>
          Account
        </button>
        <button className="cart-button">
          <span className="cart-icon">🛒</span>
          Cart
        </button>
      </div>
    </header>
  );
};

export default Header;
