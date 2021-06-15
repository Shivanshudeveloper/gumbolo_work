const mongoose = require('mongoose');

const usersSuccessfullPaymentchema = new mongoose.Schema({
    transactionId: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    fullName: {
        type: String,
        required: false
    },
    phoneno: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    zipcode: {
        type: String,
        required: false
    },
    amount: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const SuccessfullPayment = mongoose.model('SuccessfullPayment', usersSuccessfullPaymentchema)
module.exports = SuccessfullPayment