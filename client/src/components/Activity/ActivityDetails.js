import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../services/api'; // Assuming Axios is pre-configured

const ActivityDetails = () => {
  const { id } = useParams(); // Get the activity ID from the route params
  const [activity, setActivity] = useState(null);
  const [sessionData, setSessionData] = useState({
    distance: '',
    weight: '',
    duration: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await API.get(`/activities/${id}`);
        setActivity(response.data);
      } catch (error) {
        console.error('Error fetching activity:', error);
      } finally {
        setLoading(false); // Ensure loading is false even if an error occurs
      }
    };
    fetchActivity();
  }, [id]);

  const handleSessionSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post(`/activities/${id}/session`, { metrics: sessionData });
      alert('Session logged successfully!');
    } catch (error) {
      console.error('Error logging session:', error);
    }
  };

  if (loading) return <p>Loading activity...</p>;

  return (
    <div>
      {activity ? (
        <div>
          <h2>{activity.name}</h2>
          <p>{activity.description}</p>

          <form onSubmit={handleSessionSubmit}>
            <label>Distance ({activity.metricUnits.distance || 'units'}):</label>
            <input
              type="number"
              value={sessionData.distance}
              onChange={(e) => setSessionData({ ...sessionData, distance: e.target.value })}
            />

            <label>Weight ({activity.metricUnits.weight || 'units'}):</label>
            <input
              type="number"
              value={sessionData.weight}
              onChange={(e) => setSessionData({ ...sessionData, weight: e.target.value })}
            />

            <label>Duration ({activity.metricUnits.duration || 'units'}):</label>
            <input
              type="number"
              value={sessionData.duration}
              onChange={(e) => setSessionData({ ...sessionData, duration: e.target.value })}
            />

            <button type="submit">Log Session</button>
          </form>
        </div>
      ) : (
        <p>Activity not found.</p>
      )}
    </div>
  );
};

export default ActivityDetails;
