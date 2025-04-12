import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CategoryNav from './CategoryNav';
import { useCart } from '../../context/CartContext';
import { searchProducts } from '../../services/api';
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useCart();

  const cartItemCount = state.cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    // Check for user on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Add event listener for storage changes
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem('user');
      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
      } else {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
    window.location.href = '/';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMenuOpen(false);
  };

  const handleCategorySelect = (category) => {
    console.log('Selected category:', category);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const results = await searchProducts({ name: searchQuery.trim() }, 1, 20);
      // Store both search query and results
      localStorage.setItem('searchQuery', searchQuery.trim());
      localStorage.setItem('searchResults', JSON.stringify(results));
      
      // Force a new navigation even if we're already on the search page
      if (location.pathname === '/search') {
        navigate('/search', { replace: true });
      } else {
        navigate('/search');
      }
      
      setSearchQuery('');
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <header>
      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/">ShopEase</Link>
        </div>
        
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        <form className="nav-search" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link to="/cart" className="nav-cart" onClick={() => setIsMobileMenuOpen(false)}>
            Cart <span className="cart-count">{cartItemCount}</span>
          </Link>
          
          <div className="nav-account" ref={menuRef}>
            {user ? (
              <>
                <button 
                  className="account-button" 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {user.username || 'Account'}
                </button>
                {isMenuOpen && (
                  <div className="account-dropdown">
                    <Link 
                      to="/user" 
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      My Account
                    </Link>
                    <Link 
                      to="/cart" 
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      My Cart
                    </Link>
                    <button onClick={handleLogout}>
                      Sign Out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      <CategoryNav onCategorySelect={handleCategorySelect} />
    </header>
  );
};

export default Navbar;
