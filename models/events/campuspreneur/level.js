const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const levelSchema = new Schema({
    number : {
        type: Number,
        required: true
    }, 
    answer : {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Level', levelSchema);