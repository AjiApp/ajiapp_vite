// src/components/Header/Header.js
import React, { useState } from 'react';
import './Header.css';
import ajiLogoImage from '../../assets/aji-logo.svg';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="container header-content">
        {/* Logo */}
        <div className="header-logo">
          <img src={ajiLogoImage} alt="Aji" />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation */}
        <nav className={`header-nav ${mobileMenuOpen ? 'mobile-menu-open' : 'hide-on-mobile'}`}>
          <ul>
            <li><a href="#whyaji" onClick={() => setMobileMenuOpen(false)}>Why Aji</a></li>
            <li><a href="#howitworks" onClick={() => setMobileMenuOpen(false)}>How It Works</a></li>
            <li><a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a></li>
            <li><a href="#download" onClick={() => setMobileMenuOpen(false)}>Download</a></li>
            <li><a href="#footer" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
          </ul>
        </nav>

        {/* Bouton d'action (CTA) */}
        <div className="header-cta">
          <a href="#download" className="btn">
            Download App
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;