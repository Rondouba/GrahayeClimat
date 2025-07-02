
const express = require('express');
const router = express.Router();
const BlogPost = require('../../models/BlogPost');
const { auth, admin } = require('../../middleware/auth');

// @route   GET api/blog/posts
// @desc    Get all blog posts
// @access  Public
router.get('/posts', async (req, res) => {
    try {
        const posts = await BlogPost.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/blog/posts
// @desc    Create a blog post
// @access  Private/Admin
router.post('/posts', [auth, admin], async (req, res) => {
    try {
        const newPost = new BlogPost(req.body);
        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: ' + err.message);
    }
});

// @route   PUT api/blog/posts/:id
// @desc    Update a blog post
// @access  Private/Admin
router.put('/posts/:id', [auth, admin], async (req, res) => {
    try {
        const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            return res.status(404).json({ msg: 'Blog post not found' });
        }
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/blog/posts/:id
// @desc    Delete a blog post
// @access  Private/Admin
router.delete('/posts/:id', [auth, admin], async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Blog post not found' });
        }
        await post.deleteOne();
        res.json({ msg: 'Blog post removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
