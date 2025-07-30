import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom'; // ✅ Ajout de Link
import AjiLogo from '../../assets/logoWhite.svg';
import EmailIcon from '../../assets/email-icon.svg';

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

          {/* ✅ Liens vers les pages */}
          <div className="footer-links">
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
