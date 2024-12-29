import React, { useState } from 'react';
import axios from 'axios';

const CreateActivityForm = ({ onActivityCreated }) => {  // Optional callback to trigger refresh
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // State to track the selected metrics
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

  // Handle checkbox changes for metric selection
  const handleMetricChange = (e) => {
    setSelectedMetrics({
      ...selectedMetrics,
      [e.target.name]: e.target.checked, // Toggle the checkbox state
    });
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // Ensure the token exists
    if (!token) {
      console.error('No token found, user is not authenticated.');
      return;
    }

    // Prepare the selected metrics
    const selectedQuantitativeMetrics = {};
    const selectedQualitativeMetrics = {};
    const selectedFrequencyMetrics = {};

    // Map the selected metrics to the appropriate categories
    if (selectedMetrics.count) selectedQuantitativeMetrics.count = 0;
    if (selectedMetrics.duration) selectedQuantitativeMetrics.duration = 0;
    if (selectedMetrics.distance) selectedQuantitativeMetrics.distance = 0;
    if (selectedMetrics.weight) selectedQuantitativeMetrics.weight = 0;
    if (selectedMetrics.speed) selectedQuantitativeMetrics.speed = 0;
    if (selectedMetrics.repetitions) selectedQuantitativeMetrics.repetitions = 0;

    if (selectedMetrics.mood) selectedQualitativeMetrics.mood = '';
    if (selectedMetrics.difficulty) selectedQualitativeMetrics.difficulty = '';
    if (selectedMetrics.enjoyment) selectedQualitativeMetrics.enjoyment = '';
    if (selectedMetrics.focus) selectedQualitativeMetrics.focus = '';

    if (selectedMetrics.streak) selectedFrequencyMetrics.streak = 0;
    if (selectedMetrics.frequency) selectedFrequencyMetrics.frequency = 0;

    // Prepare the activity data to be sent to the backend
    const activityData = {
      name,
      description,
      quantitativeMetrics: selectedQuantitativeMetrics,
      qualitativeMetrics: selectedQualitativeMetrics,
      frequencyMetrics: selectedFrequencyMetrics,
    };

    try {
      // Send the POST request to create the activity
      const response = await axios.post('/api/activities/create', activityData, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the JWT token
        },
      });

      console.log('Activity created successfully:', response.data);

      // Reset the form after successful submission
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

      // Trigger the parent callback to refresh the activity dashboard
      if (onActivityCreated) {
        onActivityCreated();
      }
    } catch (error) {
      console.error('Error creating activity:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Activity</h2>

      {/* Activity Name */}
      <label>Activity Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* Activity Description */}
      <label>Description:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Select Metrics */}
      <h3>Select Metrics to Track</h3>

      {/* Quantitative Metrics */}
      <label>
        <input
          type="checkbox"
          name="count"
          checked={selectedMetrics.count}
          onChange={handleMetricChange}
        />
        Count
      </label>
      <label>
        <input
          type="checkbox"
          name="duration"
          checked={selectedMetrics.duration}
          onChange={handleMetricChange}
        />
        Duration (time spent)
      </label>
      <label>
        <input
          type="checkbox"
          name="distance"
          checked={selectedMetrics.distance}
          onChange={handleMetricChange}
        />
        Distance
      </label>
      <label>
        <input
          type="checkbox"
          name="weight"
          checked={selectedMetrics.weight}
          onChange={handleMetricChange}
        />
        Weight
      </label>
      <label>
        <input
          type="checkbox"
          name="speed"
          checked={selectedMetrics.speed}
          onChange={handleMetricChange}
        />
        Speed
      </label>
      <label>
        <input
          type="checkbox"
          name="repetitions"
          checked={selectedMetrics.repetitions}
          onChange={handleMetricChange}
        />
        Repetitions
      </label>

      {/* Qualitative Metrics */}
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

      {/* Frequency Metrics */}
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

      {/* Submit Button */}
      <button type="submit">Create Activity</button>
    </form>
  );
};

export default CreateActivityForm;
