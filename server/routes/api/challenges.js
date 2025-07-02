
const express = require('express');
const router = express.Router();
const Challenge = require('../../models/Challenge');
const { auth, admin } = require('../../middleware/auth');


// @route   GET api/challenges
// @desc    Get all challenges
// @access  Public
router.get('/', async (req, res) => {
    try {
        const challenges = await Challenge.find();
        res.json(challenges);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/challenges
// @desc    Create a challenge
// @access  Private/Admin
router.post('/', [auth, admin], async (req, res) => {
    try {
        const newChallenge = new Challenge(req.body);
        const challenge = await newChallenge.save();
        res.json(challenge);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/challenges/:id
// @desc    Update a challenge
// @access  Private/Admin
router.put('/:id', [auth, admin], async (req, res) => {
    try {
        const challenge = await Challenge.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!challenge) {
            return res.status(404).json({ msg: 'Challenge not found' });
        }
        res.json(challenge);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/challenges/:id
// @desc    Delete a challenge
// @access  Private/Admin
router.delete('/:id', [auth, admin], async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);
        if (!challenge) {
            return res.status(404).json({ msg: 'Challenge not found' });
        }
        await challenge.deleteOne();
        res.json({ msg: 'Challenge removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
