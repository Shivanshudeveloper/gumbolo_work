const mongoose = require('mongoose');
// Schema
const promotionsDataSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    registration_description: {
        type: String,
        required: false
    },
    buttonlabel: {
        type: String,
        required: false
    },
    organization: {
        type: String,
        required: false
    },
    templateversion: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const promotions = mongoose.model('promotions', promotionsDataSchema)
module.exports = promotions