import React, { useState, useEffect } from 'react';
import './Header.css';
import { NAVIGATION_ITEMS } from '../../config/constants';
import { scrollToElement, debounce } from '../../utils/helpers';
import ajiLogoImage from '../../assets/images/logos/aji-logo.svg';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = debounce(() => {
      setIsScrolled(window.scrollY > 50);
    }, 10);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.header-nav') && !event.target.closest('.mobile-menu-button')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (href) => {
    // Close mobile menu
    setMobileMenuOpen(false);
    
    // Scroll to element with offset for fixed header
    scrollToElement(href, 80);
  };

  const handleDownloadClick = () => {
    scrollToElement('#download', 80);
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-content">
        {/* Logo */}
        <div className="header-logo">
          <img 
            src={ajiLogoImage} 
            alt="Aji - Your guide to Morocco" 
            onClick={() => scrollToElement('#', 0)}
            style={{ cursor: 'pointer' }}
          />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-button ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation */}
        <nav 
          className={`header-nav ${mobileMenuOpen ? 'mobile-menu-open' : 'hide-on-mobile'}`}
          role="navigation"
          aria-label="Main navigation"
        >
          <ul>
            {NAVIGATION_ITEMS.map((item) => (
              <li key={item.id}>
                <a 
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  aria-label={`Navigate to ${item.label} section`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Button */}
        <div className="header-cta">
          <button 
            onClick={handleDownloadClick}
            className="btn"
            aria-label="Download AJI app"
          >
            Download App
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Header;