import React from 'react';
import { Link } from 'react-router-dom';
import ActivityDashboard from './Activity/ActivityDashboard';
import CreateActivityForm from './Activity/CreateActivityForm';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>Welcome to Your Dashboard</h1>
            <p>Track your daily activities and monitor progress.</p>

            {/* Link to the Profile page */}
            <Link to="/profile">
                <button>View Profile</button>
            </Link>

            {/* Create Activity Form */}
            <CreateActivityForm />

            {/* Display Activity Dashboard */}
            <ActivityDashboard />
        </div>
    );
};

export default Dashboard;
