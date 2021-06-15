const mongoose = require('mongoose');
// Schema
const usersDataSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    businessId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const users = mongoose.model('users', usersDataSchema)
module.exports = users