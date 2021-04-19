const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    email: {
        type: String
    },
    createdAt:{
        type: Date,
        default: new Date().toLocaleString().split(',')[0]
    },
    body:{
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
        },
})

module.exports = mongoose.model('Review', reviewSchema)