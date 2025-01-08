import React, { useState } from 'react';
import axios from 'axios';

const CreateActivityForm = ({ onActivityCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [newMetric, setNewMetric] = useState({ name: '', unit: '' });

  // Add a new metric with its unit
  const handleAddMetric = () => {
    if (newMetric.name && newMetric.unit) {
      setSelectedMetrics([...selectedMetrics, newMetric]);
      setNewMetric({ name: '', unit: '' });
    }
  };

  const handleDeleteMetric = (metricName) => {
    setSelectedMetrics(selectedMetrics.filter((metric) => metric.name !== metricName));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('accessToken'); // Use 'accessToken'
    if (!token) {
      console.error('No access token found. Redirecting to login...');
      window.location.href = '/login';
      return;
    }

    const activityData = {
      name,
      description,
      metrics: selectedMetrics, // Save selected metrics and their units
    };

    try {
      const response = await axios.post('/api/activities/create', activityData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Activity created successfully:', response.data);
      setName('');
      setDescription('');
      setSelectedMetrics([]);
      onActivityCreated();
    } catch (error) {
      if (error.response?.status === 401) {
        console.error('Token expired. Redirecting to login...');
        window.location.href = '/login';
      } else {
        console.error('Error creating activity:', error.response?.data || error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Activity</h2>

      <label>Activity Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

      <h3>Trackable Metrics</h3>
      {selectedMetrics.length > 0 ? (
        <ul>
          {selectedMetrics.map((metric, index) => (
            <li key={index}>
              {metric.name} ({metric.unit})
              <button type="button" onClick={() => handleDeleteMetric(metric.name)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No metrics selected yet.</p>
      )}

      <div>
        <label>Metric Name:</label>
        <input
          type="text"
          value={newMetric.name}
          onChange={(e) => setNewMetric({ ...newMetric, name: e.target.value })}
          placeholder="e.g., Distance, Weight"
        />

        <label>Unit:</label>
        <input
          type="text"
          value={newMetric.unit}
          onChange={(e) => setNewMetric({ ...newMetric, unit: e.target.value })}
          placeholder="e.g., meters, kg"
        />

        <button type="button" onClick={handleAddMetric}>
          Add Metric
        </button>
      </div>

      <button type="submit">Create Activity</button>
    </form>
  );
};

export default CreateActivityForm;
