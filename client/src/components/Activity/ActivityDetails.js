import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../services/api';
import ActivityChart from './ActivityChart'; // Import the chart component

const ActivityDetails = () => {
  const { id } = useParams(); // Get activity ID from route params
  const [activity, setActivity] = useState(null);
  const [sessionData, setSessionData] = useState({
    distance: '',
    weight: '',
    duration: '',
  });
  const [metrics, setMetrics] = useState([]); // Store session data for charting

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await API.get(`/activities/${id}`);
        setActivity(response.data);
        setMetrics(response.data.sessions || []); // Load session data for charting
      } catch (error) {
        console.error('Error fetching activity:', error);
      }
    };

    fetchActivity();
  }, [id]);

  const handleSessionSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post(`/activities/${id}/session`, {
        metrics: sessionData,
      });

      setMetrics(response.data.sessions); // Update chart data
      setSessionData({ distance: '', weight: '', duration: '' }); // Reset form
      alert('Session logged successfully!');
    } catch (error) {
      console.error('Error logging session:', error);
    }
  };

  return (
    <div>
      {activity ? (
        <div>
          <h2>{activity.name}</h2>
          <p>{activity.description}</p>

          {/* Display Chart */}
          {metrics.length > 0 && <ActivityChart metrics={metrics} />}

          {/* Log Session Form */}
          <form onSubmit={handleSessionSubmit}>
            <label>Distance:</label>
            <input
              type="number"
              value={sessionData.distance}
              onChange={(e) => setSessionData({ ...sessionData, distance: e.target.value })}
            />

            <label>Weight:</label>
            <input
              type="number"
              value={sessionData.weight}
              onChange={(e) => setSessionData({ ...sessionData, weight: e.target.value })}
            />

            <label>Duration:</label>
            <input
              type="number"
              value={sessionData.duration}
              onChange={(e) => setSessionData({ ...sessionData, duration: e.target.value })}
            />

            <button type="submit">Log Session</button>
          </form>
        </div>
      ) : (
        <p>Loading activity...</p>
      )}
    </div>
  );
};

export default ActivityDetails;
