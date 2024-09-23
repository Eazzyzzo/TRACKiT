const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    metrics: { type: Array, required: true }, // Metrics that users will track
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Existing user model
}, { timestamps: true });

module.exports = mongoose.model('Activity', ActivitySchema);
