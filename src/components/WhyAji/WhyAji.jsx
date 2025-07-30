import React from 'react';
import './WhyAji.css';
// Use relative import instead of absolute path
import phone from '../../assets/phone.svg';

const WhyAji = () => {
  return (
    <section id="whyaji" className="why-aji-section">
      {/* Conteneur interne contrôlable */}
      <div className="why-aji-container">
        {/* Titre principal */}
        <h2 className="why-aji-title">WHY AJI?</h2>

        {/* Sous-titre */}
        <h3 className="why-aji-subtitle">Your all-in travel guide to Morocco</h3>

        {/* Description / texte complémentaire */}
        <p className="why-aji-subdesc">
          Aji is an all in travel guide to Morocco. 
          Want to learn how to get your visa? book your flight? 
          buy an e-sim? or discover touristic sites and activities during your stay in Morocco?
          AJI is here to help you plan all aspects of your next trip to Morocco. 
          Download AJI now! 
        </p>

        {/* Images en bas, empilées en colonne */}
        <div className="phone-images">
          <img 
            src={phone} 
            alt="Aji App Features" 
            className="phone-image"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyAji;