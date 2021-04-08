const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name:{
        type: String
    },
    rating: {
        type: Number,
    },
    email:{
        type: String,
    },
    createdAt:{
        type: Date,
        default: new Date().toLocaleString().split(',')[0]
    },
    body:{
        type: String
    }
})

module.exports = mongoose.model('Review', reviewSchema)