const mongoose = require('mongoose');
// Schema
const CalenderSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const aggrements = mongoose.model('calender', CalenderSchema)
module.exports = aggrements