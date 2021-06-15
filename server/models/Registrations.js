const mongoose = require('mongoose');
// Schema
const registrationsDataSchema = new mongoose.Schema({
    promotionId: {
        type: String,
        required: true
    },
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
    browser: {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const registrations = mongoose.model('registrations', registrationsDataSchema)
module.exports = registrations