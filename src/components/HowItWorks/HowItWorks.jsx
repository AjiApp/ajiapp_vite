import React from 'react';
import './HowItWorks.css';
import { HOW_IT_WORKS_STEPS } from '../../config/constants';
import { scrollToElement } from '../../utils/helpers';

const HowItWorks = () => {
  const handleGetStartedClick = () => {
    scrollToElement('#download', 80);
  };

  return (
    <section 
      className="how-it-works-section" 
      id="howitworks"
      role="region"
      aria-labelledby="how-it-works-title"
    >
      <div className="how-it-works-container">
        
        {/* Main Title */}
        <h2 id="how-it-works-title" className="how-it-works-title">
          How It Works
        </h2>
        
        {/* Subtitle */}
        <p className="how-it-works-subtitle">
          Getting started with AJI is simple and straightforward
        </p>

        {/* Steps Process */}
        <div className="steps-container">
          <div className="steps-row" role="list" aria-label="How to use AJI app steps">
            
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <React.Fragment key={step.id}>
                
                {/* Step Item */}
                <div 
                  className="step" 
                  role="listitem"
                  aria-label={`Step ${step.id}: ${step.title}`}
                >
                  <div 
                    className="circle"
                    aria-label={`Step number ${step.id}`}
                  >
                    {step.id}
                  </div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>

                {/* Connection Line (except after last step) */}
                {index < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div className="line" aria-hidden="true"></div>
                )}
                
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="how-it-works-cta">
          <p className="cta-description">
            Ready to start your Moroccan adventure?
          </p>
          <button
            onClick={handleGetStartedClick}
            className="get-started-button"
            aria-label="Get started by downloading AJI app"
          >
            Get Started Now
          </button>
        </div>

        {/* Additional Info */}
        <div className="additional-info">
          <div className="info-stats">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Happy Travelers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Moroccan Cities</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4.8★</span>
              <span className="stat-label">App Rating</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;