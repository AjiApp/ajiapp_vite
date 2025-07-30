import React from 'react';
import './WhyAji.css';
import { scrollToElement } from '../../utils/helpers';

// Import using new structure
import phoneImage from '../../assets/images/mockups/phone.svg';

const WhyAji = () => {
  const features = [
    "Visa guidance and requirements",
    "Flight booking assistance", 
    "eSIM connectivity solutions",
    "Tourist sites and activities discovery",
    "Local accommodation booking",
    "Cultural insights and tips"
  ];

  const handleDownloadClick = () => {
    scrollToElement('#download', 80);
  };

  return (
    <section 
      className="why-aji-section" 
      id="whyaji" 
      role="main"
      aria-labelledby="why-aji-title"
    >
      <div className="why-aji-container">
        
        {/* Main Title */}
        <h2 id="why-aji-title" className="why-aji-title">
          WHY AJI?
        </h2>

        {/* Subtitle */}
        <h3 className="why-aji-subtitle">
          Your all-in-one travel guide to Morocco
        </h3>

        {/* Description */}
        <div className="why-aji-content">
          <p className="why-aji-description">
            AJI is a comprehensive travel companion designed specifically for Morocco. 
            Whether you're planning your first visit or returning to explore more, 
            AJI provides everything you need in one convenient app.
          </p>
          
          {/* Features List */}
          <div className="features-grid">
            <h4 className="features-title">What AJI offers:</h4>
            <ul className="features-list" role="list">
              {features.map((feature, index) => (
                <li key={index} className="feature-item" role="listitem">
                  <span className="feature-icon" aria-hidden="true">✓</span>
                  <span className="feature-text">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Call to Action */}
          <div className="why-aji-cta">
            <p className="cta-text">Ready to explore Morocco?</p>
            <button 
              onClick={handleDownloadClick}
              className="cta-button"
              aria-label="Download AJI app now"
            >
              Download AJI Now
            </button>
          </div>
        </div>

        {/* Phone Image */}
        <div className="phone-images">
          <img 
            src={phoneImage} 
            alt="AJI app interface showcasing Morocco travel features and user-friendly design"
            className="phone-image"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyAji;