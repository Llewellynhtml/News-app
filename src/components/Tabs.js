// src/components/Tabs.js
import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import './Tabs.css'; // Import the CSS for tabs

const Tabs = () => {
  return (
    <div className="tabs-container">
      <div className="tabs-links">
        <Link to="/privacy-policy" className="tab-link privacy-policy-link">Privacy Policy</Link>
      </div>
    </div>
  );
};

export default Tabs;
