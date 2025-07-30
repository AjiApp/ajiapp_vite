import React, { useState } from 'react';
import './Download.css';
import { STORE_URLS, CONTACT_INFO } from '../../config/constants';
import { handleExternalLink, formatMailto } from '../../utils/helpers';

// Import using new structure
import appStoreImage from '../../assets/images/buttons/app-store.png';
import playStoreImage from '../../assets/images/buttons/play-store.png';

const Download = () => {
  const [isLoading, setIsLoading] = useState({ ios: false, android: false });

  const handleStoreClick = async (storeType) => {
    setIsLoading(prev => ({ ...prev, [storeType]: true }));
    
    try {
      const url = storeType === 'ios' ? STORE_URLS.appStore : STORE_URLS.playStore;
      
      // Analytics tracking (if available)
      if (window.gtag) {
        window.gtag('event', 'download_click', {
          store_type: storeType,
          button_location: 'download_section'
        });
      }
      
      handleExternalLink(url);
    } catch (error) {
      console.error('Error opening store:', error);
    } finally {
      setTimeout(() => {
        setIsLoading(prev => ({ ...prev, [storeType]: false }));
      }, 1000);
    }
  };

  const handleContactClick = () => {
    const mailtoUrl = formatMailto(
      CONTACT_INFO.email,
      'AJI App Inquiry',
      'Hello AJI team, I would like to know more about...'
    );
    window.location.href = mailtoUrl;
  };

  const features = [
    'Available in 3 languages',
    'Works offline',
    'Regular updates',
    'Free to download'
  ];

  return (
    <section 
      className="app-download-container" 
      id="download"
      role="region"
      aria-labelledby="download-title"
    >
      <div className="download-card">
        
        {/* Header */}
        <header className="download-header">
          <h2 className="card-subtitle" aria-label="Call to action">
            JOIN THE OTHERS
          </h2>
          <h1 id="download-title" className="card-title">
            Download The App Now
          </h1>
          <p className="card-description">
            Experience Morocco like never before with our comprehensive travel companion. 
            Start your journey today and discover the beauty of Morocco with confidence.
          </p>
        </header>

        {/* Features Grid */}
        <div className="features-highlight">
          <h3 className="features-title">Why choose AJI?</h3>
          <ul className="features-grid" role="list">
            {features.map((feature, index) => (
              <li key={index} className="feature-item" role="listitem">
                <span className="feature-icon" aria-hidden="true">✓</span>
                <span className="feature-text">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Store Buttons */}
        <div className="store-buttons" role="group" aria-label="Download app from stores">
          <button
            onClick={() => handleStoreClick('ios')}
            className={`store-button-wrapper ${isLoading.ios ? 'loading' : ''}`}
            aria-label={isLoading.ios ? 'Opening App Store...' : 'Download AJI on the App Store'}
            disabled={isLoading.ios}
          >
            {isLoading.ios && <div className="loading-spinner" aria-hidden="true"></div>}
            <img 
              src={appStoreImage}
              alt="Download on the App Store" 
              className="store-button"
              loading="lazy"
              decoding="async"
            />
          </button>
          
          <button
            onClick={() => handleStoreClick('android')}
            className={`store-button-wrapper ${isLoading.android ? 'loading' : ''}`}
            aria-label={isLoading.android ? 'Opening Google Play...' : 'Get AJI on Google Play'}
            disabled={isLoading.android}
          >
            {isLoading.android && <div className="loading-spinner" aria-hidden="true"></div>}
            <img 
              src={playStoreImage}
              alt="Get it on Google Play" 
              className="store-button"
              loading="lazy"
              decoding="async"
            />
          </button>
        </div>

        {/* Additional Info */}
        <div className="download-info">
          <p className="info-text">
            Compatible with iOS 12.0+ and Android 6.0+
          </p>
          <div className="contact-info">
            <p>Need help? 
              <button 
                onClick={handleContactClick}
                className="contact-link"
                aria-label="Contact AJI support team"
              >
                Contact us
              </button>
            </p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="social-proof">
          <div className="proof-stats">
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Downloads</span>
            </div>
            <div className="stat">
              <span className="stat-number">4.8</span>
              <span className="stat-label">Rating</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Cities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download;