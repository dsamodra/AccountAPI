const mongoose = require('mongoose');

// SCHEMA USER
const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    profileImg: String,
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);


