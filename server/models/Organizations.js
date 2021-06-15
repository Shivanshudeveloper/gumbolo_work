const mongoose = require('mongoose');
// Schema
const organizationsDataSchema = new mongoose.Schema({
    organizationName: {
        type: Array,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const organizations = mongoose.model('organizations', organizationsDataSchema)
module.exports = organizations