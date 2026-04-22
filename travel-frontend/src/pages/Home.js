import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="page home">
      <h2>Welcome to Gems Frontend</h2>
      <p>This is the home/dashboard page. Navigate to other sections using the menu above.</p>
      <div className="dashboard-cards">
        <div className="card">
          <h3>Data Display</h3>
          <p>View data retrieved from the backend.</p>
          <Link to="/data" className="btn">Go to Data Display</Link>
        </div>
        <div className="card">
          <h3>Form Page</h3>
          <p>Submit data to the backend.</p>
          <Link to="/form" className="btn">Go to Form Page</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;