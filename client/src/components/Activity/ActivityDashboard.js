import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ActivityChart from './ActivityChart';

const ActivityDashboard = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem('token');
	if (!token) throw new Error('No token found.');

        const response = await axios.get('/api/activities', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setActivities(response.data);
      } catch (error) {
	if (error.response?.status === 401) {
      console.error('Token expired. Attempting to refresh...');
      // Call refresh logic here or redirect to login
      window.location.href = '/login';
    } else {
        console.error('Error fetching activities:', error.response?.data || error.message);
      }
     }
    };
    fetchActivities();
  }, []);

  const handleViewSummary = async (activityId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/activities/${activityId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedActivity(response.data);
    } catch (error) {
      console.error('Error fetching activity summary:', error.response?.data || error.message);
    }
  };

  const handleDelete = async (activityId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/activities/${activityId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActivities((prev) => prev.filter((activity) => activity._id !== activityId));
      alert('Activity deleted successfully!');
    } catch (error) {
      console.error('Error deleting activity:', error.response?.data || error.message);
    }
  };

  return (
    <div className="activity-dashboard">
      <h2>Your Activities</h2>
      {activities.length > 0 ? (
        <ul>
          {activities.map((activity) => (
            <li key={activity._id}>
              <h3>{activity.name}</h3>
              <p>{activity.description}</p>
              <button onClick={() => handleViewSummary(activity._id)}>View Summary</button>
              <button onClick={() => handleDelete(activity._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No activities yet.</p>
      )}

      {selectedActivity && (
        <div className="activity-details">
          <h3>{selectedActivity.name} Summary</h3>
          <p>{selectedActivity.description}</p>
          <ActivityChart metrics={selectedActivity.sessions.map((s) => s.metrics)} />
        </div>
      )}
    </div>
  );
};

export default ActivityDashboard;
