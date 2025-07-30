import React from 'react';
import './Hero.css';
import { STORE_URLS } from '../../config/constants';
import { handleExternalLink } from '../../utils/helpers';

// Import images using the new structure
import phoneMockup from '../../assets/images/mockups/phone-mockup.png';
import appStoreImage from '../../assets/images/buttons/app-store.png';
import playStoreImage from '../../assets/images/buttons/play-store.png';

const Hero = () => {
  const handleStoreClick = (storeType) => {
    const url = storeType === 'ios' ? STORE_URLS.appStore : STORE_URLS.playStore;
    handleExternalLink(url);
  };

  return (
    <section className="hero" id="hero" role="banner">
      <div className="hero-content">
        
        {/* IMAGE COLUMN */}
        <div className="hero-image">
          <img 
            src={phoneMockup} 
            alt="AJI app interface on mobile phone showing Morocco travel features"
            loading="eager"
            decoding="async"
          />
        </div>
        
        {/* TEXT COLUMN + DOWNLOAD BUTTONS */}
        <div className="hero-text">
          <h1>Your only guide to Morocco</h1>
          <p>A comprehensive travel guide app that helps users plan their perfect trip to Morocco with ease and confidence.</p>
          
          <div className="store-buttons" role="group" aria-label="Download AJI app">
            <button
              onClick={() => handleStoreClick('ios')}
              className="store-button-wrapper"
              aria-label="Download AJI on the App Store"
            >
              <img 
                src={appStoreImage}
                alt="Download on the App Store" 
                loading="eager"
                decoding="async"
              />
            </button>
            
            <button
              onClick={() => handleStoreClick('android')}
              className="store-button-wrapper"
              aria-label="Get AJI on Google Play"
            >
              <img 
                src={playStoreImage}
                alt="Get it on Google Play" 
                loading="eager"
                decoding="async"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;