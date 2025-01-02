const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new activity
router.post('/create', authMiddleware, async (req, res) => {
    try {
        const {
            name,
            description,
            quantitativeMetrics,
            qualitativeMetrics,
            frequencyMetrics,
            metricUnits,
            rating,
            notes,
            goals
        } = req.body; // Collect metrics from the request body
        const userId = req.user._id;

        const newActivity = new Activity({
            name,
            description,
            quantitativeMetrics,
            qualitativeMetrics,
            frequencyMetrics,
	    metricUnits,
            rating,
            notes,
            goals,
            user: userId
        });

        await newActivity.save(); // Save the new activity
        res.status(201).json(newActivity);
    } catch (error) {
        res.status(500).json({ error: 'Error creating activity' });
    }
});

// Fetch all activities for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
    try {
        // Find all activities where the `user` matches the logged-in user's ID
        const activities = await Activity.find({ user: req.user._id });
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching activities' });
    }
});

// Get activity details by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);

        if (!activity) return res.status(404).json({ error: 'Activity not found' });
        if (activity.user.toString() !== req.user._id.toString()) return res.status(403).json({ error: 'Unauthorized' });

        res.status(200).json(activity); // Return activity details
    } catch (error) {
        res.status(500).json({ error: 'Error fetching activity' });
    }
});

// Get activity summary over time
router.get('/:id/summary', authMiddleware, async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);

        if (!activity) return res.status(404).json({ error: 'Activity not found' });
        if (activity.user.toString() !== req.user._id.toString()) return res.status(403).json({ error: 'Unauthorized' });

        // Return the sessions data for the activity over time
        res.status(200).json(activity.sessions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching activity summary' });
    }
});

// Delete activities
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    if (activity.user.toString() !== req.user._id.toString()) return res.status(403).json({ error: 'Unauthorized' });

    await activity.remove();
    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting activity' });
  }
});

// fetch metrics
router.get('/:id/metrics', authMiddleware, async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    if (activity.user.toString() !== req.user._id.toString()) return res.status(403).json({ error: 'Unauthorized' });

    const metrics = activity.sessions.map((session) => session.metrics);
    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching metrics' });
  }
});

module.exports = router;

