const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    timeSubmitted: {
        type: Date,
        required: true
    },
    hasSubmitted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('UserYoungLeader', userSchema);
