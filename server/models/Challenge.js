
const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    icon: {
        type: {
            type: String, // 'emoji' or 'component'
            required: true,
        },
        value: {
            type: String, // emoji character or component name like 'LeafIcon'
            required: true,
        }
    }
});

module.exports = mongoose.model('Challenge', ChallengeSchema);
