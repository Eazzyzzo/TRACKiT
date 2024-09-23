const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming this is stored here

// Create a new activity
router.post('/create', authMiddleware, async (req, res) => {
    try {
        const { name, description, metrics } = req.body;
        const userId = req.user._id; // Assuming user is authenticated and user ID is available

        const newActivity = new Activity({ 
            name, 
            description, 
            metrics, 
            user: userId 
        });

        await newActivity.save();
        res.status(201).json(newActivity);
    } catch (error) {
        res.status(500).json({ error: 'Error creating activity' });
    }
});

// Get all activities for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id;
        const activities = await Activity.find({ user: userId });
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching activities' });
    }
});

module.exports = router;
