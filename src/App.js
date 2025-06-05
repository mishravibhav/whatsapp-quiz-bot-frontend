import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SurveyPage from './pages/surveyPage';
import AnalyticsPage from './pages/analyticsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="navbar">
        <Link to="/survey" className="nav-link">Survey Page</Link>
        <Link to="/analytics" className="nav-link">Analytics Page</Link>
      </div>
      <div className="content">
        <Routes>
          <Route path="/survey" element={<SurveyPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
