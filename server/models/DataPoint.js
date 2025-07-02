
const mongoose = require('mongoose');

const DataPointSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    temperature: {
        type: Number,
    },
    rain: {
        type: Number,
    },
    photoUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('DataPoint', DataPointSchema);
