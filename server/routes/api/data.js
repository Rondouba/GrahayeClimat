
const express = require('express');
const router = express.Router();
const DataPoint = require('../../models/DataPoint');
const { auth } = require('../../middleware/auth');

// @route   GET api/data/points
// @desc    Get all data points
// @access  Public
router.get('/points', async (req, res) => {
    try {
        const dataPoints = await DataPoint.find().sort({ createdAt: -1 }).populate('user', 'name');
        res.json(dataPoints);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/data/points
// @desc    Create a data point
// @access  Private
router.post('/points', auth, async (req, res) => {
    try {
        const newDataPoint = new DataPoint({
            user: req.user.id,
            temperature: req.body.temperature,
            rain: req.body.rain,
            // In a real app, handle file uploads and get a URL
            photoUrl: req.body.photoUrl || null 
        });

        const dataPoint = await newDataPoint.save();
        res.json(dataPoint);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
