import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
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

const Summary = () => {
  const { id } = useParams();
  const [sessionData, setSessionData] = useState([]);
  const [cumulativeData, setCumulativeData] = useState([]);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch(`/api/activities/${id}/sessions`); // Replace with actual API endpoint
        const data = await response.json();
        setSessionData(data);

        // Calculate cumulative metrics
        const cumulativeMetrics = data.reduce((acc, session) => {
          const metric = acc.find((m) => m.name === session.metricName);
          if (metric) {
            metric.value += session.value;
          } else {
            acc.push({ name: session.metricName, value: session.value });
          }
          return acc;
        }, []);
        setCumulativeData(cumulativeMetrics);
      } catch (error) {
        console.error('Error fetching session data:', error);
      }
    };

    fetchSessionData();
  }, [id]);

  const barData = {
    labels: cumulativeData.map((metric) => metric.name),
    datasets: [
      {
        label: 'Cumulative Metric Values',
        data: cumulativeData.map((metric) => metric.value),
        backgroundColor: ['#42a5f5', '#66bb6a', '#ffa726', '#ef5350'],
      },
    ],
  };

  return (
    <div className="summary-page">
      <h1>Activity Summary</h1>

      <table className="activity-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {sessionData.map((session, index) => (
            <tr key={index}>
              <td>{session.date}</td>
              <td>{session.time}</td>
              <td>{session.metricName}</td>
              <td>{session.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="chart">
        <h2>Cumulative Metrics</h2>
        <Bar data={barData} />
      </div>

      <div className="navigation-buttons">
        <Link to="/">
          <button>Home</button>
        </Link>
        <button onClick={() => window.history.back()}>Back</button>
      </div>
    </div>
  );
};

export default Summary;
