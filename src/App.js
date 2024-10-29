// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NewsList from './components/NewsList';
import PrivacyPolicy from './components/PrivacyPolicy'; // Import PrivacyPolicy component

function App() {
  return (
    <Router>
      <div className="App">
        <h1>NEWS HUB</h1>
        <Routes>
          <Route path="/" element={<NewsList />} /> {/* Main News List Route */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* Privacy Policy Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
