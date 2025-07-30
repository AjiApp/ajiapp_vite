import React, { useState, useEffect, useCallback } from 'react';
import Slider from 'react-slick';

// Import Slick styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Import CSS and constants
import './ServicesSlider.css';
import { SERVICES } from '../../config/constants';
import { getDeviceType, debounce } from '../../utils/helpers';

// Import service icons using new structure
import flightIcon from '../../assets/images/icons/Door.svg';
import foodIcon from '../../assets/images/icons/Door1.svg';
import discoverIcon from '../../assets/images/icons/Door2.svg';
import esimIcon from '../../assets/images/icons/Door3.svg';
import accommodationIcon from '../../assets/images/icons/Door4.svg';

const ServicesSlider = () => {
  const [deviceType, setDeviceType] = useState(getDeviceType());
  const [isAutoplayActive, setIsAutoplayActive] = useState(true);

  // Icon mapping for better maintainability
  const iconMap = {
    'Door.svg': flightIcon,
    'Door1.svg': foodIcon,
    'Door2.svg': discoverIcon,
    'Door3.svg': esimIcon,
    'Door4.svg': accommodationIcon
  };

  // Handle window resize with debouncing
  const handleResize = useCallback(
    debounce(() => {
      setDeviceType(getDeviceType());
    }, 250),
    []
  );

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  // Calculate slides to show based on device type
  const getSlidesToShow = () => {
    switch (deviceType) {
      case 'mobile':
        return 1;
      case 'tablet':
        return 2;
      default:
        return 3;
    }
  };

  // Calculate center padding based on device type
  const getCenterPadding = () => {
    switch (deviceType) {
      case 'mobile':
        return '20px';
      case 'tablet':
        return '40px';
      default:
        return '60px';
    }
  };

  // Slider settings optimized for accessibility and performance
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: 1,
    autoplay: isAutoplayActive,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: true,
    centerMode: true,
    centerPadding: getCenterPadding(),
    accessibility: true,
    focusOnSelect: true,
    swipeToSlide: true,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2.5,
          centerPadding: '50px'
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          centerPadding: '40px'
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.2,
          centerPadding: '30px'
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: '20px'
        }
      }
    ],
    beforeChange: () => {
      // Announce slide change for screen readers
      const announcement = document.getElementById('slider-announcement');
      if (announcement) {
        announcement.textContent = 'Slide changing';
      }
    }
  };

  const handleSlideInteraction = () => {
    setIsAutoplayActive(false);
    setTimeout(() => setIsAutoplayActive(true), 5000);
  };

  const handleServiceFocus = (serviceName) => {
    const announcement = document.getElementById('slider-announcement');
    if (announcement) {
      announcement.textContent = `Focused on ${serviceName} service`;
    }
  };

  return (
    <section 
      className="services-slider-wrapper" 
      id="services"
      role="region"
      aria-labelledby="services-title"
    >
      <div className="services-slider-container">
        
        {/* Section Header */}
        <header className="services-header">
          <h2 id="services-title" className="services-title">
            Our Services
          </h2>
          <p className="services-subtitle">
            Everything you need for your perfect Moroccan adventure
          </p>
        </header>

        {/* Screen reader announcement area */}
        <div 
          id="slider-announcement" 
          className="sr-only" 
          aria-live="polite"
          aria-atomic="true"
        ></div>
        
        {/* Services Slider */}
        <div 
          className="services-slider"
          role="region"
          aria-label="Services carousel"
          onMouseEnter={handleSlideInteraction}
          onFocus={handleSlideInteraction}
        >
          <Slider {...sliderSettings}>
            {SERVICES.map((service, index) => (
              <div 
                key={service.id} 
                className="service-slide-wrapper"
              >
                <div 
                  className="service-slide"
                  role="img"
                  aria-labelledby={`service-title-${service.id}`}
                  aria-describedby={`service-desc-${service.id}`}
                  tabIndex="0"
                  onFocus={() => handleServiceFocus(service.title)}
                >
                  <div className="service-icon-container">
                    <img 
                      src={iconMap[service.icon]} 
                      alt={`${service.title} service icon`}
                      className="service-image"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  
                  <div className="service-content">
                    <h3 
                      id={`service-title-${service.id}`}
                      className="service-title"
                    >
                      {service.title}
                    </h3>
                    
                    <p 
                      id={`service-desc-${service.id}`}
                      className="service-description"
                    >
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="service-number" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Service Stats */}
        <div className="services-stats" role="complementary">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{SERVICES.length}+</span>
              <span className="stat-label">Services Available</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSlider;