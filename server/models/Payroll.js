const mongoose = require('mongoose');
// Schema
const payrollDataSchema = new mongoose.Schema({
    payroll: {
        type: String,
        required: true
    },
    empname: {
        type: String,
        required: true
    },
    empid: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    perk: {
        type: String,
        required: true
    },
    total: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const payroll = mongoose.model('payroll', payrollDataSchema)
module.exports = payroll