// src/components/PrivacyPolicy.js
import React from "react";
import './PrivacyPolicy.css'; // Import the CSS file

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <h1>Privacy Policy</h1>
      <h2>Introduction</h2>
      <p>
        Welcome to our Privacy Policy page! When you use our services, you trust us with your information. This Privacy Policy is meant to help you understand what data we collect, why we collect it, and what we do with it.
      </p>
      <h2>Information We Collect</h2>
      <ul>
        <li>Personal Information (e.g., name, email)</li>
        <li>Usage Data (e.g., pages visited, time spent on pages)</li>
        <li>Cookies and Tracking Technologies</li>
      </ul>
      <h2>How We Use Your Information</h2>
      <p>
        We may use the information we collect for the following purposes:
      </p>
      <ul>
        <li>To provide and maintain our service</li>
        <li>To notify you about changes to our service</li>
        <li>To allow you to participate in interactive features of our service</li>
        <li>To provide customer support</li>
      </ul>
      <h2>Your Rights</h2>
      <p>
        You have the right to access, update, or delete the information we have on you. If you wish to be informed about what personal data we hold about you, and if you want it to be removed from our systems, please contact us.
      </p>
      <a href="/" className="back-button">Back to Home</a>
    </div>
  );
};

export default PrivacyPolicy;
