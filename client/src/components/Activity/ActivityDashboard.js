import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const ActivityDashboard = ({ refresh }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch activities from backend using the pre-configured Axios instance
    const fetchActivities = async () => {
      try {
        const response = await API.get('/activities');  // Automatically includes the token
        setActivities(response.data); // Set fetched activities to state
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities(); // Call the function to fetch activities
  }, [refresh]);  // Dependency on "refresh" so that activities are refetched when it changes

  return (
    <div className="activity-dashboard">
      <h2>Your Activities</h2>
      {activities.length > 0 ? (
        <ul>
          {activities.map((activity) => (
            <li key={activity._id}>
              <h3>{activity.name}</h3>
              <p>{activity.description}</p>
              <strong>Metrics:</strong>
              <ul>
                {/* Display Quantitative Metrics */}
                {Object.entries(activity.quantitativeMetrics).map(([key, value], index) => (
                  <li key={index}>{`${key}: ${value}`}</li>
                ))}
                {/* Display Qualitative Metrics */}
                {Object.entries(activity.qualitativeMetrics).map(([key, value], index) => (
                  <li key={index}>{`${key}: ${value}`}</li>
                ))}
                {/* Display Frequency Metrics */}
                {Object.entries(activity.frequencyMetrics).map(([key, value], index) => (
                  <li key={index}>{`${key}: ${value}`}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No activities yet.</p>
      )}
    </div>
  );
};

export default ActivityDashboard;
