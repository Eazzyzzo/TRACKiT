import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ActivityDashboard from './Activity/ActivityDashboard';
import CreateActivityForm from './Activity/CreateActivityForm';

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const [refreshActivities, setRefreshActivities] = useState(false); // Used to trigger re-fetch of activities

  // Fetch activities on component load and when refreshActivities changes
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const response = await axios.get('/api/activities', {
          headers: {
            Authorization: `Bearer ${token}` // Include the token for authentication
          },
        });
        setActivities(response.data); // Store activities in state
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities(); // Fetch activities when the component loads or refreshActivities changes
  }, [refreshActivities]); // Re-fetch activities when refreshActivities state changes

  // Function to trigger re-fetching of activities
  const handleActivityCreated = () => {
    setRefreshActivities((prev) => !prev); // Toggle state to re-render and refetch activities
  };

  return (
    <div className="dashboard">
      <h1>Welcome to Your Dashboard</h1>
      <p>Track your daily activities and monitor progress.</p>

      {/* Link to the Profile page */}
      <Link to="/profile">
        <button>View Profile</button>
      </Link>

      {/* Create Activity Form */}
      <CreateActivityForm onActivityCreated={handleActivityCreated} />

      {/* Display Activities Section */}
      <div className="activities-section">
        <h2>Your Activities</h2>
        {activities.length > 0 ? (
          <ul>
            {activities.map((activity) => (
              <li key={activity._id}>
                {/* Link to the Activity Details page */}
                <Link to={`/activities/${activity._id}`}>{activity.name}</Link>
                <p>{activity.description}</p>

                {/* Link to the Summary page */}
                <Link to={`/activities/${activity._id}/summary`}>
                  <button>View Summary</button>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No activities yet. Start by creating one!</p>
        )}
      </div>

      {/* Display Activity Dashboard */}
      <ActivityDashboard refresh={refreshActivities} />
    </div>
  );
};

export default Dashboard;
