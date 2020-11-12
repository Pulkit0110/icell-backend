const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    number : {
        type: Number,
        required: true
    }, 
    questionType: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    score: {
        type:Number,
        required: true
    },

    // these are not necessary for every question
    statement: String,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    imageUrl: String
});

module.exports = mongoose.model('QuestionYoungleaders', questionSchema);
