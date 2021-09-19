const mongoose = require('mongoose');

// SCHEMA USER
const URLSchema = mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    url: {
        type: String,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('DB_URL', URLSchema);


