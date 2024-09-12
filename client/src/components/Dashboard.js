import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      <p>Track your daily activities and monitor progress.</p>

      {/* Add a link to the profile */}
      <Link to="/profile">
        <button>View Profile</button>
      </Link>
    </div>
  );
};

export default Dashboard;
