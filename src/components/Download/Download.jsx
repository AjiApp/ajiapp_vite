import React from 'react';
import './Download.css';

import appStoreImage from '../../assets/app-store.png';
import playStoreImage from '../../assets/play-store.png';

const Download = () => {
  return (
    <div id ="download" className="app-download-container">
      <div className="download-card">
        <h2 className="card-subtitle">JOIN THE OTHERS</h2>
        <h1 className="card-title">Download The App Now</h1>
        <p className="card-description">
          Enjoy the Moroccan adventure in the smoothest way possible.
        </p>
        
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
  );
};

export default Download;
