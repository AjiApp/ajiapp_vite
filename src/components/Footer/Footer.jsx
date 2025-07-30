
// src/components/Footer/Footer.jsx - Mise à jour avec le lien blog
import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import AjiLogo from '../../assets/images/logos/logoWhite.svg';
import EmailIcon from '../../assets/images/email-icon.svg';

const Footer = () => {
  return (
    <footer id="footer" className="aji-footer">
      <div className="footer-logo">
        <img src={AjiLogo} alt="AJI logo" />
      </div>

      <div className="footer-content">
        <div className="footer-left">
          <img src={EmailIcon} alt="email icon" className="email-icon" />
          <div className="email-text">
            <div className="email-label">Email Us</div>
            <a href="mailto:Aji@ajiapp.com" className="email-link">
              Aji@ajiapp.com
            </a>
          </div>
        </div>

        <div className="footer-right">
          <p>© 2025 AJI | All rights reserved</p>

          <div className="footer-links">
            <Link to="/blog" className="footer-link">Blog</Link>
            <span> | </span>
            <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
            <span> | </span>
            <Link to="/terms" className="footer-link">Terms &amp; Conditions</Link>
            <span> | </span>
            <Link to="/AccountDeletionInfo" className="footer-link">Account Deletion</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
