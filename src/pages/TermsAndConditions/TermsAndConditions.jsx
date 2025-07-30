import React from "react";
import "./TermsAndConditions.css";

const TermsAndConditions = () => {
  return (
    <div className="terms-wrapper">
      <div className="terms-container">
        <h1>Terms and Conditions of Use</h1>
        <p className="updated-date">Last Updated: 26/06/25</p>
        <p>
          Welcome to AJI &ndash; Your All-in-One Travel Companion for Morocco. By
          using the AJI mobile application ("App"), you agree to these Terms and
          Conditions. Please read them carefully before proceeding.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using this App, you confirm that you are at least 18
          years old and agree to be bound by these Terms. If you do not agree,
          please do not use the App.
        </p>

        <h2>2. Services Provided</h2>
        <p>AJI provides a range of services to assist travelers in Morocco, including:</p>
        <ul>
          <li>eSIM purchasing and activation</li>
          <li>Visa guidance and links</li>
          <li>Hotel and flight booking</li>
          <li>Ticket booking for events</li>
          <li>Local transportation and taxi services</li>
          <li>Emergency contact access</li>
          <li>Tourist and cultural guides</li>
        </ul>
        <p>
          Some services may require third-party integration and are subject to the
          providers' own terms.
        </p>

        <h2>3. User Responsibilities</h2>
        <p>You agree to:</p>
        <ul>
          <li>Provide accurate and complete information when using the app</li>
          <li>Use the services only for lawful purposes</li>
          <li>Respect local laws and customs when using location-based features</li>
        </ul>
        <p>You must not misuse the App, attempt to access restricted areas, or distribute harmful content.</p>

        <h2>4. eSIM and Telecom Services</h2>
        <p>
          eSIMs provided through AJI are managed by telecom partners. By
          purchasing an eSIM, you agree to their terms and privacy policy.
          Service availability and pricing may vary depending on your selected
          data pack.
        </p>

        <h2>5. Third-Party Bookings</h2>
        <p>
          Flight, hotel, and ticket reservations made through AJI are handled by
          third-party providers. AJI is not liable for delays, cancellations, or
          service changes by these providers.
        </p>

        <h2>6. Privacy and Data Protection</h2>
        <p>AJI respects your privacy. We collect and process personal data in accordance with our Privacy Policy. Key data includes:</p>
        <ul>
          <li>Contact and identity information</li>
          <li>Location (if enabled)</li>
          <li>Booking and usage history</li>
        </ul>
        <p>Your data is used to enhance app functionality and user experience.</p>

        <h2>7. Account Deletion</h2>
        <p>
          You may request deletion of your account and associated data at any
          time by contacting us at <a href="mailto:aji@ajiapp.tech">aji@ajiapp.tech</a>
          or via the Account Deletion Request Page.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>AJI is not responsible for:</p>
        <ul>
          <li>Interruptions or failures due to internet or third-party services</li>
          <li>Actions taken by third-party service providers</li>
          <li>Loss or damage caused by misuse of the app</li>
        </ul>
        <p>
          We aim to ensure accurate content but do not guarantee completeness or
          suitability for every traveler.
        </p>

        <h2>9. Modifications to the Terms</h2>
        <p>
          We reserve the right to update these Terms at any time. Any changes
          will be communicated within the app or via email. Continued use after
          updates implies acceptance of the new terms.
        </p>

        <h2>10. Contact</h2>
        <p>
          For any questions about these Terms, please contact us:<br />
          Email: <a href="mailto:aji@ajiapp.tech">aji@ajiapp.tech</a><br />
          Website: <a href="https://www.ajiapp.com">www.ajiapp.com</a>
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;