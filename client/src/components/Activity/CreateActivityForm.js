import React, { useState } from 'react';
import axios from 'axios';

const CreateActivityForm = ({ onActivityCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMetrics, setSelectedMetrics] = useState({
    count: false,
    duration: false,
    distance: false,
    weight: false,
    speed: false,
    repetitions: false,
    mood: false,
    difficulty: false,
    enjoyment: false,
    focus: false,
    streak: false,
    frequency: false,
  });
  const [metricUnits, setMetricUnits] = useState({
    distance: '',
    weight: '',
    duration: '',
    speed: '',
  });

  // Handle checkbox changes for metric selection
  const handleMetricChange = (e) => {
    setSelectedMetrics({
      ...selectedMetrics,
      [e.target.name]: e.target.checked,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. User is not authenticated.');
      return;
    }

    // Prepare the metrics
    const quantitativeMetrics = {};
    const qualitativeMetrics = {};
    const frequencyMetrics = {};

    if (selectedMetrics.count) quantitativeMetrics.count = 0;
    if (selectedMetrics.duration) quantitativeMetrics.duration = 0;
    if (selectedMetrics.distance) quantitativeMetrics.distance = 0;
    if (selectedMetrics.weight) quantitativeMetrics.weight = 0;
    if (selectedMetrics.speed) quantitativeMetrics.speed = 0;
    if (selectedMetrics.repetitions) quantitativeMetrics.repetitions = 0;

    if (selectedMetrics.mood) qualitativeMetrics.mood = '';
    if (selectedMetrics.difficulty) qualitativeMetrics.difficulty = '';
    if (selectedMetrics.enjoyment) qualitativeMetrics.enjoyment = '';
    if (selectedMetrics.focus) qualitativeMetrics.focus = '';

    if (selectedMetrics.streak) frequencyMetrics.streak = 0;
    if (selectedMetrics.frequency) frequencyMetrics.frequency = 0;

    const activityData = {
      name,
      description,
      quantitativeMetrics,
      qualitativeMetrics,
      frequencyMetrics,
      metricUnits, // Include the units in the activity data
    };

    try {
      const response = await axios.post('/api/activities/create', activityData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Activity created successfully:', response.data);
      onActivityCreated(); // Trigger parent callback to refresh activities
      setName('');
      setDescription('');
      setSelectedMetrics({
        count: false,
        duration: false,
        distance: false,
        weight: false,
        speed: false,
        repetitions: false,
        mood: false,
        difficulty: false,
        enjoyment: false,
        focus: false,
        streak: false,
        frequency: false,
      });
      setMetricUnits({
        distance: '',
        weight: '',
        duration: '',
        speed: '',
      });
    } catch (error) {
      console.error('Error creating activity:', error.response?.data || error.message);
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
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <h3>Select Metrics to Track</h3>

      <label>
        <input
          type="checkbox"
          name="distance"
          checked={selectedMetrics.distance}
          onChange={handleMetricChange}
        />
        Distance
      </label>
      {selectedMetrics.distance && (
        <input
          type="text"
          placeholder="Unit (e.g., meters)"
          value={metricUnits.distance}
          onChange={(e) =>
            setMetricUnits({ ...metricUnits, distance: e.target.value })
          }
        />
      )}

      <label>
        <input
          type="checkbox"
          name="weight"
          checked={selectedMetrics.weight}
          onChange={handleMetricChange}
        />
        Weight
      </label>
      {selectedMetrics.weight && (
        <input
          type="text"
          placeholder="Unit (e.g., kg)"
          value={metricUnits.weight}
          onChange={(e) =>
            setMetricUnits({ ...metricUnits, weight: e.target.value })
          }
        />
      )}

      <label>
        <input
          type="checkbox"
          name="duration"
          checked={selectedMetrics.duration}
          onChange={handleMetricChange}
        />
        Duration
      </label>
      {selectedMetrics.duration && (
        <input
          type="text"
          placeholder="Unit (e.g., minutes)"
          value={metricUnits.duration}
          onChange={(e) =>
            setMetricUnits({ ...metricUnits, duration: e.target.value })
          }
        />
      )}

      <label>
        <input
          type="checkbox"
          name="speed"
          checked={selectedMetrics.speed}
          onChange={handleMetricChange}
        />
        Speed
      </label>
      {selectedMetrics.speed && (
        <input
          type="text"
          placeholder="Unit (e.g., m/s)"
          value={metricUnits.speed}
          onChange={(e) =>
            setMetricUnits({ ...metricUnits, speed: e.target.value })
          }
        />
      )}

      {/* Other Metrics */}
      <label>
        <input
          type="checkbox"
          name="mood"
          checked={selectedMetrics.mood}
          onChange={handleMetricChange}
        />
        Mood
      </label>
      <label>
        <input
          type="checkbox"
          name="difficulty"
          checked={selectedMetrics.difficulty}
          onChange={handleMetricChange}
        />
        Difficulty
      </label>
      <label>
        <input
          type="checkbox"
          name="enjoyment"
          checked={selectedMetrics.enjoyment}
          onChange={handleMetricChange}
        />
        Enjoyment
      </label>
      <label>
        <input
          type="checkbox"
          name="focus"
          checked={selectedMetrics.focus}
          onChange={handleMetricChange}
        />
        Focus
      </label>
      <label>
        <input
          type="checkbox"
          name="streak"
          checked={selectedMetrics.streak}
          onChange={handleMetricChange}
        />
        Streak
      </label>
      <label>
        <input
          type="checkbox"
          name="frequency"
          checked={selectedMetrics.frequency}
          onChange={handleMetricChange}
        />
        Frequency
      </label>

      <button type="submit">Create Activity</button>
    </form>
  );
};

export default CreateActivityForm;
