const mongoose = require('mongoose');
// Schema
const aggrementsDataSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: false
    },
    aggrements: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const aggrements = mongoose.model('aggrements', aggrementsDataSchema)
module.exports = aggrements