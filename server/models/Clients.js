const mongoose = require('mongoose');
// Schema
const clientsDataSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: false
    },
    fullname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    reason: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    petname: {
        type: String,
        required: false
    },
    amountpay: {
        type: String,
        required: false
    },
    dateofappointment: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const clients = mongoose.model('clients', clientsDataSchema)
module.exports = clients