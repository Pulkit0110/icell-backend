const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type: String,
        required : true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    userTableName: {
        type: String,
        required: true
    },
    questionTableName: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Events',eventSchema);