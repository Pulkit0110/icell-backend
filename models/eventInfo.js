const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventInfoSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    numberOfUsers: {
        type: String,
        required: true,
    },
    prizes: {
        type: Object,
        required: true,
    },
    info: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    },
    rules: {
        type: Array,
    },
    faqs: {
        type: Array,
    }
});

module.exports = mongoose.model("EventInfo", eventInfoSchema);
