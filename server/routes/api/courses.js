
const express = require('express');
const router = express.Router();
const Course = require('../../models/Course');
const { auth, admin } = require('../../middleware/auth');

// @route   GET api/courses
// @desc    Get all courses
// @access  Public
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/courses
// @desc    Create a course
// @access  Private/Admin
router.post('/', [auth, admin], async (req, res) => {
    try {
        const newCourse = new Course({
            title: req.body.title,
            level: req.body.level,
            duration: req.body.duration,
            students: req.body.students,
            image: req.body.image,
        });

        const course = await newCourse.save();
        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/courses/:id
// @desc    Update a course
// @access  Private/Admin
router.put('/:id', [auth, admin], async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }

        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/courses/:id
// @desc    Delete a course
// @access  Private/Admin
router.delete('/:id', [auth, admin], async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }

        await course.deleteOne();

        res.json({ msg: 'Course removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
