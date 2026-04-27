import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import DataDisplay from './pages/DataDisplay.jsx';
import FormPage from './pages/FormPage.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <h1 className="nav-title">Gems Frontend</h1>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/data">Data Display</Link></li>
              <li><Link to="/form">Form Page</Link></li>
            </ul>
          </div>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/data" element={<DataDisplay />} />
            <Route path="/form" element={<FormPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
