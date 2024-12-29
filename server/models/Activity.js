const mongoose = require('mongoose');

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
  }
});

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

  rating: { type: Number, default: 0 },
  notes: { type: String, default: '' },
  goals: { type: String, default: '' },

  sessions: [SessionSchema], // Store sessions for the activity
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
}, { timestamps: true });

module.exports = mongoose.model('Activity', ActivitySchema);
