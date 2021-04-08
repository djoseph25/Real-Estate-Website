const express = require('express');
const router = express.Router();
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const {listingModel} = require('../model/listingBlogModel');
const { response } = require('express');

/***  SECTION Get All listing */
router.get('/listing', catchAsync(async(req, res, next)=>{
    const listing = await listingModel.find({})
    res.render('Listing/listing', {listing})
}))

/***  SECTION Create New listing */
router.get('/listing/new', catchAsync(async(req, res)=>{
 res.render('Listing/new')
}))

router.post('/listing', catchAsync(async(req, res)=>{
    const listing = await listingModel(req.body)
    console.log(listing)
    listing.save()
    res.send('send')
}))

/***  SECTION GET A SINGLE listing */
router.get('/listing/:id', catchAsync(async(req, res, next)=>{
    const listing = await listingModel.findById(req.params.id)
    console.log(listing);
    res.render('Listing/show', {listing})
}))

// /***  SECTION Edit listing */
// router.get('/listing/:id/edit', catchAsync(async(req, res)=>{
//     const listing = await listingModel.findById(req.params.id)
//     res.render('Listing/edit', {listing})
// }))

// router.put('/listing/:id', catchAsync(async(req, res, next)=>{
//     const listingUpdate = await listingModel.findByIdAndUpdate(req.params.id, req.body)
//     listingUpdate.save()
//     console.log(listingUpdate)
//     res.redirect(`/Listing/${listingUpdate._id}`)
// }))
// /***  SECTION Delete listing */
// router.delete('/listing/:id', catchAsync(async(req, res)=>{
//     const listing = await listingModel.findByIdAndDelete(req.params.id)
//     listing.save()
//     res.redirect('/Listing')
// }))

module.exports = router;