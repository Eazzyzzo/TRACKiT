import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ActivitySummary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]); // Default as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Get token from localStorage
        if (!token) {
          throw new Error('No token found. Please log in again.');
        }

        const response = await axios.get(`/api/activities/${id}/summary`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('API Response:', response.data); // Debugging the API response

        // Handle API response structure
        const { summaryData } = response.data; // Assuming `summaryData` contains the array
        if (!Array.isArray(summaryData)) {
          throw new Error('Invalid data format');
        }

        setSessions(summaryData); // Set sessions to the extracted array
      } catch (error) {
        console.error('Error fetching session summary:', error.message);
        setSessions([]); // Default to an empty array in case of an error
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [id]);

  if (loading) return <p>Loading summary...</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <button onClick={() => navigate('/')}>Home</button>
      <h1>Activity Summary</h1>

      {/* Table of Sessions */}
      <table style={{ borderSpacing: '10px' }}> 
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>Date</th>
            <th style={{ textAlign: 'center' }}>Time</th>
            {sessions.length > 0 &&
              Object.keys(sessions[0]?.metrics || {}).map((metric, index) => (
                <th key={index} style={{ textAlign: 'center' }}>{metric}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {sessions.map((session, index) => (
            <tr key={index}>
              <td style={{ textAlign: 'center' }}>{new Date(session.date).toLocaleDateString()}</td>
              <td style={{ textAlign: 'center' }}>{session.time}</td>
              {Object.values(session.metrics || {}).map((value, idx) => (
                <td key={idx} style={{ textAlign: 'center' }}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivitySummary;
