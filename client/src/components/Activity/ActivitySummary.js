import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

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

  // Ensure sessions is an array before calling reduce
  const cumulativeMetrics = sessions.reduce(
    (acc, session) => {
      acc[0] += session.metrics?.metric1 || 0;
      acc[1] += session.metrics?.metric2 || 0;
      acc[2] += session.metrics?.metric3 || 0;
      return acc;
    },
    [0, 0, 0]
  );

  const barData = {
    labels: ['Metric 1', 'Metric 2', 'Metric 3'],
    datasets: [
      {
        label: 'Cumulative Metrics',
        data: cumulativeMetrics,
        backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56'],
      },
    ],
  };

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <button onClick={() => navigate('/')}>Home</button>
      <h1>Activity Summary</h1>

      {/* Table of Sessions */}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            {sessions.length > 0 &&
              Object.keys(sessions[0]?.metrics || {}).map((metric, index) => (
                <th key={index}>{metric}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {sessions.map((session, index) => (
            <tr key={index}>
              <td>{new Date(session.date).toLocaleDateString()}</td>
              <td>{session.time}</td>
              {Object.values(session.metrics || {}).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bar Chart */}
      <Bar data={barData} />
    </div>
  );
};

export default ActivitySummary;
