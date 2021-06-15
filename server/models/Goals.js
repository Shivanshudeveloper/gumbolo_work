const mongoose = require('mongoose');
// Schema
const goalsDataSchema = new mongoose.Schema({
    goal1: {
        type: String,
        required: false
    },
    goal2: {
        type: String,
        required: false
    },
    goal3: {
        type: String,
        required: false
    },
    goal4: {
        type: String,
        required: false
    },
    goal5: {
        type: String,
        required: false
    },
    completegoal1: {
        type: Boolean,
        required: false
    },
    completegoal2: {
        type: Boolean,
        required: false
    },
    completegoal3: {
        type: Boolean,
        required: false
    },
    completegoal4: {
        type: Boolean,
        required: false
    },
    completegoal5: {
        type: Boolean,
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
    endDate: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const goals = mongoose.model('goals', goalsDataSchema)
module.exports = goals