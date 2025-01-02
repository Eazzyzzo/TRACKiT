const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new activity
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { name, description, metrics } = req.body; // Collect data dynamically
    const userId = req.user._id;

    const newActivity = new Activity({
      name,
      description,
      metrics: metrics || [], // Default to an empty array
      user: userId,
    });

    await newActivity.save(); // Save the new activity to the database
    res.status(201).json(newActivity);
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ error: 'Error creating activity' });
  }
});

// Fetch all activities for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user._id });
    res.status(200).json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Error fetching activities' });
  }
});

// Get details for a specific activity
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    if (activity.user.toString() !== req.user._id.toString())
      return res.status(403).json({ error: 'Unauthorized' });

    res.status(200).json(activity);
  } catch (error) {
    console.error('Error fetching activity:', error);
    res.status(500).json({ error: 'Error fetching activity' });
  }
});

// Log a session for an activity
router.post('/:id/session', authMiddleware, async (req, res) => {
  try {
    const { metrics } = req.body; // Metrics for the session
    const activity = await Activity.findById(req.params.id);

    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    if (activity.user.toString() !== req.user._id.toString())
      return res.status(403).json({ error: 'Unauthorized' });

    activity.sessions.push({ metrics }); // Add new session
    await activity.save();

    res.status(200).json(activity);
  } catch (error) {
    console.error('Error logging session:', error);
    res.status(500).json({ error: 'Error logging session' });
  }
});

// Get summary data for an activity (e.g., chart-ready data)
router.get('/:id/summary', authMiddleware, async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    if (activity.user.toString() !== req.user._id.toString())
      return res.status(403).json({ error: 'Unauthorized' });

    const summaryData = activity.sessions.map((session, index) => ({
      session: index + 1,
      metrics: session.metrics,
    }));

    res.status(200).json(summaryData); // Return the session data
  } catch (error) {
    console.error('Error fetching activity summary:', error);
    res.status(500).json({ error: 'Error fetching activity summary' });
  }
});

// Delete an activity
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    if (activity.user.toString() !== req.user._id.toString())
      return res.status(403).json({ error: 'Unauthorized' });

    await activity.remove(); // Delete the activity
    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('Error deleting activity:', error);
    res.status(500).json({ error: 'Error deleting activity' });
  }
});

// Fetch metrics for visualization
router.get('/:id/metrics', authMiddleware, async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    if (activity.user.toString() !== req.user._id.toString())
      return res.status(403).json({ error: 'Unauthorized' });

    const metrics = activity.sessions.map((session) => session.metrics);
    res.status(200).json(metrics);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ error: 'Error fetching metrics' });
  }
});

module.exports = router;
