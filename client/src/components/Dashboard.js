import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreateActivityForm from './Activity/CreateActivityForm';

const Dashboard = ({ activities: initialActivities }) => {
  const [activities, setActivities] = useState(initialActivities || []);
  const [refreshActivities, setRefreshActivities] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Store any errors

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setIsLoading(true); 
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('/api/activities', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setActivities(response.data);
        setError(null); // Clear any previous errors
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem('accessToken');
          window.location.href = '/login'; 
        } else {
          setError(error);
          console.error('Error fetching activities:', error);
        }
      } finally {
        setIsLoading(false); 
      }
    };

    if (!initialActivities || refreshActivities) {
      fetchActivities();
    }
  }, [refreshActivities, initialActivities]);

  const handleActivityCreated = () => {
    setRefreshActivities((prev) => !prev);
  };

  const handleDeleteActivity = async (activityId) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`/api/activities/${activityId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActivities((prev) => prev.filter((activity) => activity._id !== activityId));
      alert('Activity deleted successfully!');
    } catch (error) {
      console.error('Error deleting activity:', error.response?.data || error.message);
      // Consider displaying an error message to the user
    }
  };

  return (
    <div className="dashboard">
      <h1>Welcome to Your Dashboard</h1>
      <p>Track your daily activities and monitor progress.</p>

      <Link to="/profile">
        <button>View Profile</button>
      </Link>

      <CreateActivityForm onActivityCreated={handleActivityCreated} />

      {isLoading ? (
        <p>Loading activities...</p>
      ) : error ? (
        <p>Error fetching activities: {error.message}</p>
      ) : (
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
      )}
    </div>
  );
};

export default Dashboard;
