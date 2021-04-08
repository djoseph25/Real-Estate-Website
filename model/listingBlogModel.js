const mongoose = require('mongoose');
const {listingConnection, blogConnection} = require('../connections');
// const Review = require('./reviewModel');

const ListingSchema = new mongoose.Schema({
    status:{
        type: String,
        enum: ['Rent', 'Sale']
    },
    image:{
      type: String
    },
    location:{
      type: String
    },
    price:{
        type: Number
    },
    property:{
    type: String,
    enum: ['House', 'Duplex', 'Townhome', 'Condo']
    },
    bedroom:{
      type: String,
      min: 1,
      max: 7
    },
    bathroom:{
        type: String,
        min: 1,
        max: 7
      },
      garage:{
        type: String,
        min: 1,
        max: 3
      },
    area:{
        type: Number
    },
    description:{
        type: String
    },
    // status: String,
    // image: String,
    // location: String,
    // price: Number,
    // property: String,
    // bedroom: String,
    // bathroom: String,
    // garage:String,
    // area:Number,
    // description: String,
    })

const BlogSchema = new mongoose.Schema({
    author:{
        type: String
    },
    category:{
        type: String,
        enum:['Travel', 'Vacation', 'DIY', 'Decor']
    },
    createdAt:{
        type: Date,
        default: new Date().toLocaleString().split(',')[0]
    },
    title:{
        type: String
    },
    body:{
        type: String
    },
    image: {
        type: String
    }, 
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
})

const listingModel = listingConnection.model('Listing', ListingSchema);
const blogModel = blogConnection.model('Blog', BlogSchema);

module.exports = {listingModel, blogModel}