import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryNav.css';

const CategoryNav = ({ onCategorySelect }) => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  // Categories from the database
  const categories = [
    "Shoes",
    "Apparel",
    "Accessories",
    "Electronics",
    "Toys & Games",
    "Home & Living",
    "Kitchen",
    "Jewelry",
    "Garden & Tools"
  ];

  // Number of visible categories based on screen width
  const getVisibleCategories = () => {
    const width = window.innerWidth;
    if (width >= 1200) return 8;
    if (width >= 992) return 6;
    if (width >= 768) return 5;
    if (width >= 576) return 4;
    return 3;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCategories());

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCategories());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && 
          !dropdownRef.current.contains(event.target) && 
          !buttonRef.current.contains(event.target)) {
        setShowAllCategories(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const visibleCategories = categories.slice(0, visibleCount);
  const hiddenCategories = categories.slice(visibleCount);

  const handleCategoryClick = (category, event) => {
    event.preventDefault();
    onCategorySelect(category);
    navigate('/'); // Navigate back to home page
    setShowAllCategories(false);
  };

  const updateDropdownPosition = () => {
    if (buttonRef.current && dropdownRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      dropdownRef.current.style.top = `${buttonRect.bottom + window.scrollY}px`;
      dropdownRef.current.style.right = `${window.innerWidth - buttonRect.right}px`;
    }
  };

  useEffect(() => {
    if (showAllCategories) {
      updateDropdownPosition();
      window.addEventListener('scroll', updateDropdownPosition);
      window.addEventListener('resize', updateDropdownPosition);
    }

    return () => {
      window.removeEventListener('scroll', updateDropdownPosition);
      window.removeEventListener('resize', updateDropdownPosition);
    };
  }, [showAllCategories]);

  return (
    <nav className="category-nav">
      <div className="category-scroll">
        <ul className="category-list">
          {visibleCategories.map((category, index) => (
            <li key={index}>
              <a 
                href="#" 
                onClick={(e) => handleCategoryClick(category, e)}
              >
                {category}
              </a>
            </li>
          ))}
          {hiddenCategories.length > 0 && (
            <li className="more-categories">
              <button
                ref={buttonRef}
                className="more-button"
                onClick={() => setShowAllCategories(!showAllCategories)}
                aria-expanded={showAllCategories}
              >
                More
              </button>
              {showAllCategories && (
                <div ref={dropdownRef} className="categories-dropdown">
                  <ul>
                    {hiddenCategories.map((category, index) => (
                      <li key={index}>
                        <a 
                          href="#" 
                          onClick={(e) => handleCategoryClick(category, e)}
                        >
                          {category}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default CategoryNav;
