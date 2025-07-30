import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  return (
    <section id="howitworks" className="how-it-works-section">
      {/* Container blanc arrondi au centre */}
      <div className="how-it-works-container">
        {/* Titre principal - Fixed typo */}
        <h2 className="how-it-works-title">How It Works</h2>
        {/* Sous-titre */}
        <p className="how-it-works-subtitle">Very Simple</p>

        {/* Conteneur des étapes */}
        <div className="steps-row">
          
          {/* Étape 1 */}
          <div className="step">
            <div className="circle">1</div>
            <p className="step-text">Download the app</p>
          </div>

          {/* Trait rouge entre la 1 et la 2 */}
          <div className="line"></div>

          {/* Étape 2 */}
          <div className="step">
            <div className="circle">2</div>
            <p className="step-text">Discover our services</p>
          </div>

          {/* Trait rouge entre la 2 et la 3 */}
          <div className="line"></div>

          {/* Étape 3 */}
          <div className="step">
            <div className="circle">3</div>
            <p className="step-text">Enjoy your trip</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;