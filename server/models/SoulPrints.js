const mongoose = require('mongoose');
// Schema
const soulprintsDataSchema = new mongoose.Schema({
    soulprint: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    todaydate: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const soulprints = mongoose.model('soulprints', soulprintsDataSchema)
module.exports = soulprints