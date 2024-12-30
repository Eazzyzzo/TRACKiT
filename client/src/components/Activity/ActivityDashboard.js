import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import ActivityChart from './ActivityChart'; // Import the chart component

const ActivityDashboard = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await API.get('/activities');
        setActivities(response.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  const handleViewSummary = async (activityId) => {
    try {
      const response = await API.get(`/activities/${activityId}`);
      setSelectedActivity(response.data); // Set the selected activity for viewing its details
    } catch (error) {
      console.error('Error fetching activity summary:', error);
    }
  };

  const handleDelete = async (activityId) => {
    try {
      await API.delete(`/activities/${activityId}`);
      setActivities((prevActivities) => prevActivities.filter((a) => a._id !== activityId));
      if (selectedActivity && selectedActivity._id === activityId) {
        setSelectedActivity(null); // Clear selected activity if it's deleted
      }
    } catch (error) {
      console.error('Error deleting activity:', error);
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

      {/* Display activity details and chart */}
      {selectedActivity && (
        <div className="activity-details">
          <h3>{selectedActivity.name} Summary</h3>
          <p>{selectedActivity.description}</p>
          <ActivityChart metrics={selectedActivity.sessions.map((s) => s.metrics)} />
          <strong>Metrics:</strong>
          <ul>
            {/* Quantitative Metrics */}
            {Object.entries(selectedActivity.quantitativeMetrics || {}).map(([key, value], index) => (
              <li key={index}>{`${key}: ${value}`}</li>
            ))}
            {/* Qualitative Metrics */}
            {Object.entries(selectedActivity.qualitativeMetrics || {}).map(([key, value], index) => (
              <li key={index}>{`${key}: ${value}`}</li>
            ))}
            {/* Frequency Metrics */}
            {Object.entries(selectedActivity.frequencyMetrics || {}).map(([key, value], index) => (
              <li key={index}>{`${key}: ${value}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ActivityDashboard;
