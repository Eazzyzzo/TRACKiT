const mongoose = require('mongoose');

// Schema for individual sessions within an activity
const SessionSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  metrics: {
    count: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    distance: { type: Number, default: 0 },
    speed: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
    mood: { type: String, default: '' },
    difficulty: { type: String, default: '' },
    enjoyment: { type: String, default: '' },
    focus: { type: String, default: '' },
  },
});

// Schema for the activity, including metric units
const ActivitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },

  quantitativeMetrics: {
    count: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    distance: { type: Number, default: 0 },
    speed: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
  },

  qualitativeMetrics: {
    mood: { type: String, default: '' },
    difficulty: { type: String, default: '' },
    enjoyment: { type: String, default: '' },
    focus: { type: String, default: '' },
  },

  frequencyMetrics: {
    streak: { type: Number, default: 0 },
    frequency: { type: Number, default: 0 },
  },

  // Add metric units field
  metricUnits: {
    distance: { type: String, default: 'meters' },
    weight: { type: String, default: 'kg' },
    duration: { type: String, default: 'minutes' },
    speed: { type: String, default: 'm/s' },
    // Add units for other metrics as needed
  },

  // Reference user who created the activity
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Sessions tracked for the activity
  sessions: [SessionSchema],

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Activity', ActivitySchema);
