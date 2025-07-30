import React, { useEffect } from 'react';
import { scrollToElement, formatMailto } from '../../utils/helpers';
import { CONTACT_INFO } from '../../config/constants';
import './TermsAndConditions.css';

const TermsAndConditions = () => {
  useEffect(() => {
    scrollToElement('#', 0);
    
    // Update document title
    document.title = 'Terms and Conditions - AJI App | Your Guide to Morocco';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Terms and conditions of use for AJI App, your comprehensive travel guide to Morocco.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Terms and conditions of use for AJI App, your comprehensive travel guide to Morocco.';
      document.head.appendChild(meta);
    }

    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Terms and Conditions",
      "description": "Terms and conditions of use for AJI App",
      "url": window.location.href,
      "dateModified": "2025-06-26",
      "provider": {
        "@type": "Organization",
        "name": "AJI App",
        "url": CONTACT_INFO.website
      }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const services = [
    'eSIM purchasing and activation',
    'Visa guidance and links', 
    'Hotel and flight booking',
    'Ticket booking for events',
    'Local transportation and taxi services',
    'Emergency contact access',
    'Tourist and cultural guides'
  ];

  const sections = [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      content: 'By accessing or using this App, you confirm that you are at least 18 years old and agree to be bound by these Terms. If you do not agree, please do not use the App.'
    },
    {
      id: 'services',
      title: '2. Services Provided',
      content: 'AJI provides a range of services to assist travelers in Morocco, including:'
    },
    {
      id: 'responsibilities',
      title: '3. User Responsibilities',
      content: 'You agree to use the services responsibly and in compliance with applicable laws.'
    }
  ];

  const handleContactClick = () => {
    const mailtoUrl = formatMailto(
      CONTACT_INFO.email,
      'AJI Terms & Conditions Inquiry',
      'Hello AJI team, I have a question about the terms and conditions...'
    );
    window.location.href = mailtoUrl;
  };

  const handleTableOfContentsClick = (sectionId) => {
    scrollToElement(`#${sectionId}`, 100);
  };

  return (
    <div className="terms-wrapper">
      <div className="terms-container">
        
        {/* Header */}
        <header className="terms-header">
          <h1 className="terms-title">Terms and Conditions of Use</h1>
          <div className="terms-meta">
            <p className="updated-date">
              <span className="update-label">Last Updated:</span>
              <time dateTime="2025-06-26">June 26, 2025</time>
            </p>
            <p className="effective-date">
              <span className="effective-label">Effective Date:</span>
              <time dateTime="2025-06-26">June 26, 2025</time>
            </p>
          </div>
          <div className="terms-intro">
            <p>
              Welcome to AJI – Your All-in-One Travel Companion for Morocco. By using the AJI mobile 
              application ("App"), you agree to these Terms and Conditions. Please read them carefully 
              before proceeding.
            </p>
          </div>
        </header>

        {/* Table of Contents */}
        <nav className="table-of-contents" aria-label="Terms and conditions sections">
          <h2 className="toc-title">Table of Contents</h2>
          <ol className="toc-list">
            <li><button onClick={() => handleTableOfContentsClick('acceptance')}>Acceptance of Terms</button></li>
            <li><button onClick={() => handleTableOfContentsClick('services')}>Services Provided</button></li>
            <li><button onClick={() => handleTableOfContentsClick('responsibilities')}>User Responsibilities</button></li>
            <li><button onClick={() => handleTableOfContentsClick('esim-services')}>eSIM and Telecom Services</button></li>
            <li><button onClick={() => handleTableOfContentsClick('third-party-bookings')}>Third-Party Bookings</button></li>
            <li><button onClick={() => handleTableOfContentsClick('privacy-data')}>Privacy and Data Protection</button></li>
            <li><button onClick={() => handleTableOfContentsClick('account-deletion')}>Account Deletion</button></li>
            <li><button onClick={() => handleTableOfContentsClick('liability')}>Limitation of Liability</button></li>
            <li><button onClick={() => handleTableOfContentsClick('modifications')}>Modifications to the Terms</button></li>
            <li><button onClick={() => handleTableOfContentsClick('contact')}>Contact</button></li>
          </ol>
        </nav>

        {/* Main Content */}
        <main className="terms-content">
          
          <section id="acceptance" className="terms-section">
            <h2 className="section-title">1. Acceptance of Terms</h2>
            <p>
              By accessing or using this App, you confirm that you are at least 18 years old and 
              agree to be bound by these Terms. If you do not agree, please do not use the App.
            </p>
            <div className="important-notice">
              <strong>Important:</strong> These terms constitute a legally binding agreement between 
              you and AJI App.
            </div>
          </section>

          <section id="services" className="terms-section">
            <h2 className="section-title">2. Services Provided</h2>
            <p>AJI provides a range of services to assist travelers in Morocco, including:</p>
            <ul className="services-list">
              {services.map((service, index) => (
                <li key={index} className="service-item">
                  <span className="service-icon" aria-hidden="true">•</span>
                  <span className="service-text">{service}</span>
                </li>
              ))}
            </ul>
            <p className="service-note">
              <strong>Note:</strong> Some services may require third-party integration and are 
              subject to the providers' own terms.
            </p>
          </section>

          <section id="responsibilities" className="terms-section">
            <h2 className="section-title">3. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul className="responsibility-list">
              <li>Provide accurate and complete information when using the app</li>
              <li>Use the services only for lawful purposes</li>
              <li>Respect local laws and customs when using location-based features</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Report any unauthorized use of your account immediately</li>
            </ul>
            <div className="prohibition-notice">
              <h3>Prohibited Activities</h3>
              <p>You must not:</p>
              <ul>
                <li>Misuse the App or attempt to access restricted areas</li>
                <li>Distribute harmful, illegal, or inappropriate content</li>
                <li>Interfere with the App's operation or security</li>
                <li>Use the App for any commercial purpose without authorization</li>
              </ul>
            </div>
          </section>

          <section id="esim-services" className="terms-section">
            <h2 className="section-title">4. eSIM and Telecom Services</h2>
            <p>
              eSIMs provided through AJI are managed by telecom partners. By purchasing an eSIM, 
              you agree to their terms and privacy policy. Service availability and pricing may 
              vary depending on your selected data pack.
            </p>
            <div className="esim-details">
              <h4>Important eSIM Information:</h4>
              <ul>
                <li>eSIM activation requires compatible device</li>
                <li>Data speeds may vary based on location and network</li>
                <li>Refunds subject to partner terms and conditions</li>
                <li>Customer support provided by telecom partner</li>
              </ul>
            </div>
          </section>

          <section id="third-party-bookings" className="terms-section">
            <h2 className="section-title">5. Third-Party Bookings</h2>
            <p>
              Flight, hotel, and ticket reservations made through AJI are handled by third-party 
              providers. AJI is not liable for delays, cancellations, or service changes by these providers.
            </p>
            <div className="booking-disclaimer">
              <strong>Disclaimer:</strong> All bookings are subject to the terms and conditions 
              of the respective service providers. Please review their policies before booking.
            </div>
          </section>

          <section id="privacy-data" className="terms-section">
            <h2 className="section-title">6. Privacy and Data Protection</h2>
            <p>AJI respects your privacy. We collect and process personal data in accordance with our Privacy Policy. Key data includes:</p>
            <ul>
              <li>Contact and identity information</li>
              <li>Location data (if enabled)</li>
              <li>Booking and usage history</li>
              <li>Device and technical information</li>
            </ul>
            <p>Your data is used to enhance app functionality and user experience.</p>
          </section>

          <section id="account-deletion" className="terms-section">
            <h2 className="section-title">7. Account Deletion</h2>
            <p>
              You may request deletion of your account and associated data at any time by contacting 
              us at <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a> or via the 
              Account Deletion Request Page.
            </p>
            <div className="deletion-process">
              <h4>Deletion Process:</h4>
              <ol>
                <li>Submit deletion request via email or app</li>
                <li>Verify your identity</li>
                <li>Account and data deleted within 30 days</li>
                <li>Confirmation email sent upon completion</li>
              </ol>
            </div>
          </section>

          <section id="liability" className="terms-section">
            <h2 className="section-title">8. Limitation of Liability</h2>
            <p>AJI is not responsible for:</p>
            <ul>
              <li>Interruptions or failures due to internet or third-party services</li>
              <li>Actions taken by third-party service providers</li>
              <li>Loss or damage caused by misuse of the app</li>
              <li>Inaccuracies in third-party provided information</li>
              <li>Force majeure events beyond our control</li>
            </ul>
            <p className="accuracy-disclaimer">
              We aim to ensure accurate content but do not guarantee completeness or suitability 
              for every traveler. Always verify important information independently.
            </p>
          </section>

          <section id="modifications" className="terms-section">
            <h2 className="section-title">9. Modifications to the Terms</h2>
            <p>
              We reserve the right to update these Terms at any time. Any changes will be 
              communicated within the app or via email. Continued use after updates implies 
              acceptance of the new terms.
            </p>
            <div className="modification-notice">
              <strong>How we notify you:</strong>
              <ul>
                <li>In-app notifications</li>
                <li>Email to registered address</li>
                <li>Notice on our website</li>
                <li>Push notifications (if enabled)</li>
              </ul>
            </div>
          </section>

          <section id="contact" className="terms-section">
            <h2 className="section-title">10. Contact</h2>
            <p>For any questions about these Terms, please contact us:</p>
            <div className="contact-info">
              <div className="contact-method">
                <strong>Email:</strong> 
                <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
              </div>
              <div className="contact-method">
                <strong>Website:</strong> 
                <a href={CONTACT_INFO.website} target="_blank" rel="noopener noreferrer">
                  {CONTACT_INFO.website}
                </a>
              </div>
              <div className="contact-method">
                <strong>Support:</strong> 
                <a href={`mailto:${CONTACT_INFO.supportEmail}`}>{CONTACT_INFO.supportEmail}</a>
              </div>
            </div>
            <button 
              onClick={handleContactClick}
              className="contact-button"
              aria-label="Send email to AJI support"
            >
              Contact Support
            </button>
          </section>
        </main>

        {/* Footer */}
        <footer className="terms-footer">
          <div className="footer-content">
            <p className="footer-note">
              These terms and conditions are governed by the laws of Morocco. Any disputes will be 
              resolved through the appropriate legal channels in Morocco.
            </p>
            <div className="footer-actions">
              <button 
                onClick={() => scrollToElement('#', 0)}
                className="back-to-top"
                aria-label="Back to top of page"
              >
                ↑ Back to Top
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default TermsAndConditions;