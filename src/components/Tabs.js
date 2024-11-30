
import React from "react";
import { Link } from "react-router-dom";
import './Tabs.css'; 

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
