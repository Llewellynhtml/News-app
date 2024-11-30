import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NewsList from "./components/NewsList";
import PrivacyPolicy from "./components/PrivacyPolicy";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>NEWS HUB</h1>
        <Routes>
          <Route path="/" element={<NewsList />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
