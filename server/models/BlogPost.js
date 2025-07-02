
const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    details: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);
