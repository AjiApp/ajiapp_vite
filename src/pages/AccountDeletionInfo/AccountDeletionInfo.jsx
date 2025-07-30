import React, { useEffect, useState } from 'react';
import { scrollToElement, formatMailto, isValidEmail } from '../../utils/helpers';
import { CONTACT_INFO } from '../../config/constants';
import './AccountDeletionInfo.css';

const AccountDeletionInfo = () => {
  const [requestForm, setRequestForm] = useState({
    email: '',
    reason: '',
    confirmation: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    scrollToElement('#', 0);
    
    // Update document title
    document.title = 'Account Deletion - AJI App | Delete Your Account';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Request account deletion for AJI App. Learn about our data deletion process and how to permanently remove your account.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Request account deletion for AJI App. Learn about our data deletion process and how to permanently remove your account.';
      document.head.appendChild(meta);
    }

    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Account Deletion Information",
      "description": "Information and process for deleting your AJI App account",
      "url": window.location.href,
      "provider": {
        "@type": "Organization",
        "name": "AJI App",
        "url": CONTACT_INFO.website,
        "email": CONTACT_INFO.supportEmail
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

  const deletionSteps = [
    {
      id: 1,
      title: 'Submit Request',
      description: 'Email us or use the form below with your account details',
      icon: '📧'
    },
    {
      id: 2,
      title: 'Identity Verification',
      description: 'We verify your identity to ensure account security',
      icon: '🔐'
    },
    {
      id: 3,
      title: 'Processing',
      description: 'Account and data deletion processed within 7 business days',
      icon: '⏳'
    },
    {
      id: 4,
      title: 'Confirmation',
      description: 'Receive email confirmation when deletion is complete',
      icon: '✅'
    }
  ];

  const dataTypes = [
    { name: 'User account and profile', retained: false },
    { name: 'Personal information (name, email, phone)', retained: false },
    { name: 'Saved preferences and settings', retained: false },
    { name: 'In-app usage data linked to your identity', retained: false },
    { name: 'Transaction records', retained: true, duration: '90 days' },
    { name: 'Anonymized usage logs', retained: true, duration: 'Indefinitely' }
  ];

  const handleInputChange = (field, value) => {
    setRequestForm(prev => ({
      ...prev,
      [field]: value
    }));
    setSubmitStatus(null);
  };

  const handleQuickEmailClick = () => {
    const subject = 'Delete My AJI Account';
    const body = `Dear AJI Support Team,

I would like to request the deletion of my AJI account.

Account Information:
- Registered email: [Your registered email]
- Username: [Your username if applicable]
- Reason for deletion: [Optional]

I understand that this action is irreversible and that my account and associated data will be permanently deleted within 7 business days.

Please confirm when the deletion is complete.

Thank you,
[Your name]`;

    const mailtoUrl = formatMailto(CONTACT_INFO.supportEmail, subject, body);
    window.location.href = mailtoUrl;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Validate form
    if (!requestForm.email || !isValidEmail(requestForm.email)) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid email address.' });
      setIsSubmitting(false);
      return;
    }

    if (!requestForm.confirmation) {
      setSubmitStatus({ type: 'error', message: 'Please confirm that you understand this action is irreversible.' });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, generate mailto link with form data
      const subject = 'Delete My AJI Account - Form Submission';
      const body = `Account Deletion Request

Registered Email: ${requestForm.email}
Reason for deletion: ${requestForm.reason || 'Not specified'}

I confirm that I understand this action is irreversible.

Submitted via account deletion form.`;

      const mailtoUrl = formatMailto(CONTACT_INFO.supportEmail, subject, body);
      window.location.href = mailtoUrl;
      
      setSubmitStatus({ 
        type: 'success', 
        message: 'Your deletion request has been prepared. Please send the email that opened to complete your request.' 
      });
      
      // Reset form
      setRequestForm({ email: '', reason: '', confirmation: false });
      
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'There was an error processing your request. Please try again or contact support directly.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTableOfContentsClick = (sectionId) => {
    scrollToElement(`#${sectionId}`, 100);
  };

  return (
    <div className="account-deletion-wrapper">
      <div className="account-deletion-container">
        
        {/* Header */}
        <header className="deletion-header">
          <h1 className="deletion-title">Account Deletion Policy</h1>
          <p className="deletion-intro">
            At <strong>AJI App</strong>, we respect your privacy and give you full control over your data. 
            If you wish to delete your account and all associated personal information, you can submit 
            a request using the methods outlined below.
          </p>
        </header>

        {/* Table of Contents */}
        <nav className="table-of-contents" aria-label="Account deletion sections">
          <h2 className="toc-title">Quick Navigation</h2>
          <ul className="toc-list">
            <li><button onClick={() => handleTableOfContentsClick('deletion-process')}>Deletion Process</button></li>
            <li><button onClick={() => handleTableOfContentsClick('request-methods')}>How to Request</button></li>
            <li><button onClick={() => handleTableOfContentsClick('data-deletion')}>What Gets Deleted</button></li>
            <li><button onClick={() => handleTableOfContentsClick('data-retention')}>Data Retention</button></li>
            <li><button onClick={() => handleTableOfContentsClick('important-notes')}>Important Notes</button></li>
            <li><button onClick={() => handleTableOfContentsClick('need-help')}>Need Help</button></li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="deletion-content">
          
          {/* Deletion Process */}
          <section id="deletion-process" className="deletion-section">
            <h2 className="section-title">Account Deletion Process</h2>
            <div className="process-timeline">
              {deletionSteps.map((step, index) => (
                <div key={step.id} className="process-step">
                  <div className="step-icon" aria-hidden="true">{step.icon}</div>
                  <div className="step-content">
                    <h3 className="step-title">Step {step.id}: {step.title}</h3>
                    <p className="step-description">{step.description}</p>
                  </div>
                  {index < deletionSteps.length - 1 && (
                    <div className="step-connector" aria-hidden="true"></div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Request Methods */}
          <section id="request-methods" className="deletion-section">
            <h2 className="section-title">How to Request Account Deletion</h2>
            
            <div className="request-methods">
              
              {/* Email Method */}
              <div className="request-method">
                <h3 className="method-title">Method 1: Email Request</h3>
                <p>Send an email to our support team with the following information:</p>
                <div className="email-requirements">
                  <h4>Email Details:</h4>
                  <ul>
                    <li><strong>To:</strong> <a href={`mailto:${CONTACT_INFO.supportEmail}`}>{CONTACT_INFO.supportEmail}</a></li>
                    <li><strong>Subject:</strong> "Delete My AJI Account"</li>
                    <li><strong>Include:</strong>
                      <ul>
                        <li>Your registered email address or username</li>
                        <li>Reason for account deletion (optional)</li>
                        <li>Confirmation that you understand this action is irreversible</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <button 
                  onClick={handleQuickEmailClick}
                  className="email-button"
                  aria-label="Open email client with pre-filled deletion request"
                >
                  Send Deletion Request Email
                </button>
              </div>

              {/* Form Method */}
              <div className="request-method">
                <h3 className="method-title">Method 2: Online Form</h3>
                <p>Fill out the form below and we'll prepare your deletion request:</p>
                
                <form onSubmit={handleFormSubmit} className="deletion-form">
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Registered Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={requestForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="form-input"
                      placeholder="Enter your registered email"
                      required
                      aria-describedby="email-help"
                    />
                    <small id="email-help" className="form-help">
                      This should be the email address associated with your AJI account
                    </small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="reason" className="form-label">
                      Reason for Deletion (Optional)
                    </label>
                    <textarea
                      id="reason"
                      value={requestForm.reason}
                      onChange={(e) => handleInputChange('reason', e.target.value)}
                      className="form-textarea"
                      placeholder="Let us know why you're deleting your account (optional)"
                      rows="3"
                    />
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={requestForm.confirmation}
                        onChange={(e) => handleInputChange('confirmation', e.target.checked)}
                        className="form-checkbox"
                        required
                      />
                      <span className="checkbox-text">
                        I understand that this action is irreversible and my account and all associated 
                        data will be permanently deleted within 7 business days.
                      </span>
                    </label>
                  </div>

                  {submitStatus && (
                    <div className={`form-status ${submitStatus.type}`} role="alert">
                      {submitStatus.message}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="form-submit"
                    disabled={isSubmitting}
                    aria-label={isSubmitting ? 'Submitting deletion request...' : 'Submit deletion request'}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading-spinner" aria-hidden="true"></span>
                        Processing Request...
                      </>
                    ) : (
                      'Submit Deletion Request'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* Data Deletion */}
          <section id="data-deletion" className="deletion-section">
            <h2 className="section-title">What Data Will Be Deleted?</h2>
            <div className="data-table">
              <div className="data-table-header">
                <span>Data Type</span>
                <span>Action</span>
                <span>Timeline</span>
              </div>
              {dataTypes.map((dataType, index) => (
                <div key={index} className="data-table-row">
                  <span className="data-name">{dataType.name}</span>
                  <span className={`data-action ${dataType.retained ? 'retained' : 'deleted'}`}>
                    {dataType.retained ? 'Temporarily Retained' : 'Permanently Deleted'}
                  </span>
                  <span className="data-timeline">
                    {dataType.retained ? dataType.duration : 'Within 7 days'}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Data Retention */}
          <section id="data-retention" className="deletion-section">
            <h2 className="section-title">What Data May Be Retained Temporarily?</h2>
            <div className="retention-info">
              <div className="retention-item">
                <h4>Transaction Records</h4>
                <p>Financial transaction records may be retained for up to 90 days for accounting and legal compliance purposes.</p>
              </div>
              <div className="retention-item">
                <h4>Anonymized Usage Logs</h4>
                <p>Aggregated, anonymized usage statistics that cannot be linked back to your identity may be retained indefinitely for service improvement.</p>
              </div>
              <div className="retention-item">
                <h4>Legal Obligations</h4>
                <p>Some data may be retained longer if required by law, court order, or ongoing legal proceedings.</p>
              </div>
            </div>
          </section>

          {/* Important Notes */}
          <section id="important-notes" className="deletion-section">
            <h2 className="section-title">Important Notes</h2>
            <div className="important-notices">
              <div className="notice-item warning">
                <h4>⚠️ Action is Irreversible</h4>
                <p>Once your account is deleted, it cannot be recovered. All your data, preferences, and history will be permanently lost.</p>
              </div>
              <div className="notice-item info">
                <h4>ℹ️ Processing Time</h4>
                <p>Account deletion typically takes 7 business days to complete. You will receive confirmation once the process is finished.</p>
              </div>
              <div className="notice-item tip">
                <h4>💡 Alternative: Account Deactivation</h4>
                <p>If you're unsure about permanent deletion, consider temporarily deactivating your account instead. Contact support for this option.</p>
              </div>
            </div>
          </section>

          {/* Need Help */}
          <section id="need-help" className="deletion-section">
            <h2 className="section-title">Need Help?</h2>
            <div className="help-content">
              <p>
                If you have any questions or need support before deleting your account, please reach out to us:
              </p>
              <div className="help-options">
                <div className="help-option">
                  <h4>Email Support</h4>
                  <p><a href={`mailto:${CONTACT_INFO.supportEmail}`}>{CONTACT_INFO.supportEmail}</a></p>
                </div>
                <div className="help-option">
                  <h4>General Inquiries</h4>
                  <p><a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a></p>
                </div>
                <div className="help-option">
                  <h4>Website</h4>
                  <p><a href={CONTACT_INFO.website} target="_blank" rel="noopener noreferrer">{CONTACT_INFO.website}</a></p>
                </div>
              </div>
              <div className="help-note">
                <p>
                  <strong>Response Time:</strong> We typically respond to deletion requests within 24 hours. 
                  The actual deletion process may take up to 7 business days to complete.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="deletion-footer">
          <div className="footer-content">
            <p className="footer-note">
              This account deletion policy is part of our commitment to user privacy and data protection. 
              For more information, please review our Privacy Policy.
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

export default AccountDeletionInfo;