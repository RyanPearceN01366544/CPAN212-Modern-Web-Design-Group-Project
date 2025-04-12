import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaSignInAlt, FaUserPlus, FaShoppingBag, FaHeart, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Header.css';

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Temporary state for demo
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleLogoClick = () => {
    setSearchQuery('');
    onSearch('');
    navigate('/');
    window.location.reload();
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setShowDropdown(false);
  };

  return (
    <header className="header">
      <div className="logo-container" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
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
        <button className="cart-button">Cart</button>
        <div className="account-dropdown">
          <button className="account-button" onClick={toggleDropdown}>Account</button>
          {showDropdown && (
            <div className="dropdown-menu">
              {!isLoggedIn ? (
                <>
                  <button onClick={() => handleNavigation('/signin')} className="dropdown-item">
                    <FaSignInAlt /> Sign In
                  </button>
                  <button onClick={() => handleNavigation('/register')} className="dropdown-item">
                    <FaUserPlus /> Register
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => handleNavigation('/profile')} className="dropdown-item">
                    <FaUser /> Profile
                  </button>
                  <button onClick={() => handleNavigation('/wishlist')} className="dropdown-item">
                    <FaHeart /> Wishlist
                  </button>
                  <button onClick={() => handleNavigation('/settings')} className="dropdown-item">
                    <FaCog /> Settings
                  </button>
                  <button 
                    onClick={() => {
                      setIsLoggedIn(false);
                      setShowDropdown(false);
                    }} 
                    className="dropdown-item"
                  >
                    <FaSignOutAlt /> Sign Out
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
