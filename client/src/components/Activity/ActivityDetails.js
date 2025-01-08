import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ActivityDetails = () => {
  const { id } = useParams(); // Get activity ID from URL parameters
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [sessionData, setSessionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Use 'accessToken'
        if (!token) throw new Error('No access token found.');

        const response = await axios.get(`/api/activities/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setActivity(response.data);

        // Initialize session data for input fields
        setSessionData(
          response.data.metrics.map((metric) => ({ name: metric.name, value: '' }))
        );
      } catch (error) {
        setError(error); // Store error for handling
        console.error('Error fetching activity details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivityDetails();
  }, [id]);

  const handleLogSession = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(
        `/api/activities/${id}/session`,
        { metrics: sessionData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Session logged successfully!');
      setSessionData(
        sessionData.map((metric) => ({ ...metric, value: '' })) // Clear input fields
      );
    } catch (error) {
      console.error('Error logging session:', error);
    }
  };

  // Handle errors if present
  if (error) {
    if (error.response?.status === 401) {
      // Refresh token or redirect to login (handle appropriately)
      window.location.href = '/login';
    } else {
      return <p>Error fetching activity details: {error.message}</p>;
    }
  }

  if (loading) return <p>Loading activity...</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <button onClick={() => navigate('/')}>Home</button>

      {activity ? (
        <div>
          <h2>{activity.name}</h2>
          <p>{activity.description}</p>

          <form onSubmit={handleLogSession}>
            {activity.metrics?.length > 0 ? (
              activity.metrics.map((metric, index) => (
                <div key={index}>
                  <label>{`${metric.name} (${metric.unit}):`}</label>
                  <input
                    type="number"
                    value={
                      sessionData.find((s) => s.name === metric.name)?.value ||
                      ''
                    }
                    onChange={(e) =>
                      setSessionData(
                        sessionData.map((s) =>
                          s.name === metric.name
                            ? { ...s, value: e.target.value }
                            : s
                        )
                      )
                    }
                  />
                </div>
              ))
            ) : (
              <p>No metrics defined for this activity.</p>
            )}
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
