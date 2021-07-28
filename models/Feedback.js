const mongoose = require('mongoose');

// SCHEMA USER
const FeedbackSchema = mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    text: {
        type: String,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);


