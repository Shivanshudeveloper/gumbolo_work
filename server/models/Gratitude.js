const mongoose = require('mongoose');
// Schema
const gratitudesDataSchema = new mongoose.Schema({
    gratitude1: {
        type: String,
        required: false
    },
    gratitude2: {
        type: String,
        required: false
    },
    gratitude3: {
        type: String,
        required: false
    },
    gratitude4: {
        type: String,
        required: false
    },
    gratitude5: {
        type: String,
        required: false
    },
    todaydate: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const gratitudes = mongoose.model('gratitudes', gratitudesDataSchema)
module.exports = gratitudes