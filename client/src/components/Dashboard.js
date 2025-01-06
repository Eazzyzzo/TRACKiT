import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreateActivityForm from './Activity/CreateActivityForm';

const Dashboard = ({ activities: initialActivities }) => {
  const [activities, setActivities] = useState(initialActivities || []);
  const [refreshActivities, setRefreshActivities] = useState(false); // Used to trigger re-fetch of activities

  // Fetch activities on component load and when refreshActivities changes
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const response = await axios.get('/api/activities', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token for authentication
          },
        });
        setActivities(response.data); // Store activities in state
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    if (!initialActivities || refreshActivities) {
      fetchActivities(); // Fetch activities only if no initial data or refreshActivities changes
    }
  }, [refreshActivities, initialActivities]);

  // Function to trigger re-fetching of activities
  const handleActivityCreated = () => {
    setRefreshActivities((prev) => !prev); // Toggle state to re-render and refetch activities
  };

  // Function to delete an activity
  const handleDeleteActivity = async (activityId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/activities/${activityId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Update the activities list in state
      setActivities((prev) => prev.filter((activity) => activity._id !== activityId));
      alert('Activity deleted successfully!');
    } catch (error) {
      console.error('Error deleting activity:', error.response?.data || error.message);
    }
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
          <div className="activity-list">
            {activities.map((activity) => (
              <div key={activity._id} className="activity-card">
                <h2>{activity.name}</h2>
                <p>{activity.description}</p>
                <Link to={`/activities/${activity._id}`}>
                  <button>Log Session</button>
                </Link>
                <Link to={`/activities/${activity._id}/summary`}>
                  <button>View Summary</button>
                </Link>
                <button onClick={() => handleDeleteActivity(activity._id)}>Delete</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No activities yet. Start by creating one!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
