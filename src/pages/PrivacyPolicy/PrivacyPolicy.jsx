// src/pages/PrivacyPolicy.jsx
import React from 'react';
import './PrivacyPolicy.css'; // Import du fichier CSS séparé

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <div className="privacy-content">
        <h1 className="privacy-title">Privacy Policy</h1>

        <p className="privacy-intro">
          This Privacy Policy explains how AjiApp ("we", "us", "our") collects, uses, discloses, and safeguards your
          personal data when you visit ajiapp.com or use our mobile application. It is designed to comply with the
          GDPR, CCPA, and FTC guidance.
        </p>

        <div className="privacy-section">
          <h2 className="section-title">1. Information We Collect</h2>
          <ul className="privacy-list">
            <li><span className="highlight">Account Registration:</span> Name, email address, password</li>
            <li><span className="highlight">Profile Data:</span> Profile picture, preferences, bio</li>
            <li><span className="highlight">Support Correspondence:</span> Emails and chat logs</li>
            <li><span className="highlight">Usage Data:</span> Pages visited, features used, session duration</li>
            <li><span className="highlight">Device & Log Data:</span> IP address, device type, OS, crash reports</li>
            <li><span className="highlight">Cookies & Tracking:</span> Cookies, web beacons, local storage</li>
            <li><span className="highlight">Social Media Login:</span> Name and email from Google/Facebook</li>
            <li><span className="highlight">Analytics:</span> Data from Google Analytics, Facebook Pixel, etc.</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2 className="section-title">2. How We Use Your Information</h2>
          <ul className="privacy-list">
            <li>To operate and maintain AjiApp services</li>
            <li>To personalize content and communications</li>
            <li>To detect abuse and secure our systems</li>
            <li>To send newsletters and promotional offers</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2 className="section-title">3. Sharing of Information</h2>
          <ul className="privacy-list">
            <li><span className="highlight">With Service Providers:</span> For hosting, analytics, support</li>
            <li><span className="highlight">Legal Requirements:</span> Court orders, legal obligations</li>
            <li><span className="highlight">With Your Consent:</span> For other purposes you approve</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2 className="section-title">4. Cookies & Tracking Technologies</h2>
          <p>We use cookies and similar tools for personalization, analytics, and advertising. You can manage your preferences via browser settings.</p>
        </div>

        <div className="privacy-section">
          <h2 className="section-title">5. Data Security</h2>
          <p>We use administrative, technical, and physical safeguards to protect your data against unauthorized access or disclosure.</p>
        </div>

        <div className="privacy-section">
          <h2 className="section-title">6. Your Rights</h2>
          <ul className="privacy-list">
            <li><span className="highlight">GDPR:</span> Access, rectification, erasure, restriction, objection</li>
            <li><span className="highlight">CCPA:</span> Know, delete, opt-out of sale, non-discrimination</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2 className="section-title">7. Children's Privacy</h2>
          <p>We do not knowingly collect data from children under 13. If we become aware, we delete it.</p>
        </div>

        <div className="privacy-section">
          <h2 className="section-title">8. Third-Party Links</h2>
          <p>We are not responsible for the privacy practices of other websites or services linked from our app.</p>
        </div>

        <div className="privacy-section">
          <h2 className="section-title">9. International Data Transfers</h2>
          <p>We may transfer your data outside your country of residence using legal safeguards such as SCCs.</p>
        </div>

        <div className="privacy-section">
          <h2 className="section-title">10. Data Retention</h2>
          <p>We keep your data only as long as necessary for service provision and legal compliance.</p>
        </div>

        <div className="privacy-section">
          <h2 className="section-title">11. Changes to This Policy</h2>
          <p>We may update this policy and notify you via email or a notice on the site before changes apply.</p>
        </div>

        <div className="privacy-section">
          <h2 className="section-title">12. Contact Us</h2>
          <p>If you have questions or want to exercise your rights, contact us at: <span className="contact-email">contact@ajiapp.ma</span></p>
        </div>

        <p className="privacy-updated">Last updated: May 6, 2025</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;