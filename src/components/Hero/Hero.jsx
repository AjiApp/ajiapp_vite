// src/components/Hero/Hero.js
import React from 'react';
import './Hero.css';

// IMPORTS IMAGES
import phoneMockup from '../../assets/phone-mockup.png';   // Image du téléphone
import appStoreImage from '../../assets/app-store.png';   // Logo App Store
import playStoreImage from '../../assets/play-store.png'; // Logo Google Play

const Hero = () => {
  return (
    <section className="hero">
      {/* hero-content pour la mise en page flex sans dépendre de .container */}
      <div className="hero-content">
        
        {/* COLONNE 1 : L'IMAGE DU TÉLÉPHONE */}
        <div className="hero-image">
          <img src={phoneMockup} alt="Phone Mockup" />
        </div>
        
        {/* COLONNE 2 : TEXTE + BOUTONS DE TÉLÉCHARGEMENT */}
        <div className="hero-text">
          <h1>Your only guide to Morocco</h1>
          <p>A travel guide app that helps users plan their trip in Morocco.</p>
          
          <div className="store-buttons">
          <a 
            href="https://apps.apple.com/us/app/your-app-id" 
            className="store-link" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img 
              src={appStoreImage}
              alt="Download on the App Store" 
              className="store-button"
            />
          </a>
          <a 
            href="https://play.google.com/store/apps/details?id=your.app.id" 
            className="store-link" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img 
              src={playStoreImage}
              alt="Get it on Google Play" 
              className="store-button"
            />
          </a>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;