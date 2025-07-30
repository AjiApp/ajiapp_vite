import React from "react";
import "./AccountDeletionInfo.css";

const AccountDeletionInfo = () => {
  return (
    <div className="account-deletion-wrapper">
      <div className="account-deletion-container">
        <h1>Account Deletion Policy</h1>

        <p>
          At <strong>AJI App</strong>, we respect your privacy and give you full control over your data. If you wish to
          delete your account and all associated personal information, you can submit a request by contacting us as
          outlined below.
        </p>

        <h2>How to Request Account Deletion</h2>
        <p>To request account and data deletion:</p>
        <ul>
          <li>
            Email us at <a href="mailto:support@ajiapp.com">support@ajiapp.com</a> with the subject line:{" "}
            <strong>"Delete My AJI Account"</strong>
          </li>
          <li>
            Include the following information:
            <ul>
              <li>Your registered email address or username</li>
              <li>Reason for account deletion (optional)</li>
              <li>Confirmation that you understand this action is irreversible</li>
            </ul>
          </li>
        </ul>

        <p>
          Once we receive your request, we will verify your identity and proceed with the deletion within 7 business
          days.
        </p>

        <h2>What Data Will Be Deleted?</h2>
        <ul>
          <li>Your user account</li>
          <li>Personal information (e.g., name, email, phone number)</li>
          <li>Saved preferences and settings</li>
          <li>In-app usage data linked to your identity</li>
        </ul>

        <h2>What Data May Be Retained Temporarily?</h2>
        <ul>
          <li>Transaction records (if applicable) for up to 90 days</li>
          <li>Anonymized usage logs (not linked to your identity)</li>
        </ul>

        <h2>Need Help?</h2>
        <p>
          If you have any questions or need support before deleting your account, please reach out to us at{" "}
          <a href="mailto:support@ajiapp.com">support@ajiapp.com</a>.
        </p>
      </div>
    </div>
  );
};

export default AccountDeletionInfo;
