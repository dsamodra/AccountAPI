const mongoose = require('mongoose');

// SCHEMA USER
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    profileImg: {
        type: String,
        default: null
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);


