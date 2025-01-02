const mongoose = require('mongoose');

// Schema for individual sessions within an activity
const SessionSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  metrics: [
    {
      name: { type: String, required: true }, // Name of the metric (e.g., distance, weight)
      value: { type: Number, default: 0 },   // Value logged for the metric
    },
  ],
});

// Schema for the activity, including dynamic metrics and metric units
const ActivitySchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the activity
  description: { type: String },          // Optional description of the activity

  // Define trackable metrics with dynamic names and units
  metrics: [
    {
      name: { type: String, required: true }, // Name of the metric (e.g., distance, weight)
      unit: { type: String, required: true }, // Unit of the metric (e.g., meters, kg)
    },
  ],

  // Sessions tracked for the activity
  sessions: [SessionSchema], 

  // Reference to the user who created the activity
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Timestamps
  createdAt: { type: Date, default: Date.now }, // Automatically set creation date
});

module.exports = mongoose.model('Activity', ActivitySchema);
