import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">ShopEase</Link>
      </div>
      
      <button className="mobile-menu-button" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

      <div className="nav-search">
        <input type="text" placeholder="Search products..." />
        <button>Search</button>
      </div>

      <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link to="/cart" className="nav-cart" onClick={() => setIsMobileMenuOpen(false)}>
          Cart <span className="cart-count">0</span>
        </Link>
        
        <div className="nav-account" ref={menuRef}>
          {user ? (
            <>
              <button 
                className="account-button" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {user.name}
              </button>
              {isMenuOpen && (
                <div className="account-dropdown">
                  <Link 
                    to="/account" 
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Account Info
                  </Link>
                  <Link 
                    to="/orders" 
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Order Info
                  </Link>
                  <button onClick={handleLogout}>
                    Log Out
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                Sign In
              </Link>
              <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
