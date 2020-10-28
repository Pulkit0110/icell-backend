const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sponsorsSchema = new Schema({
    name: {
        type: String,
        required : true
    },
    imageUrl : {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Sponsors',sponsorsSchema);