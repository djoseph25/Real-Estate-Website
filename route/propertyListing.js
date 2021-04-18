const express = require('express');
const router = express.Router();
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn} = require('../utils/authenticate')
const {listingModel, blogModel} = require('../model/listingBlogModel');
/*======================================
//--//-->  🥛  GET ALL LISTING ROUTE🧮 
======================================*/
router.get('/', async (req, res, next) =>{
    if(req.query.search){}
    const listing = await listingModel.find()
    const Blog = await blogModel.find()
      res.render('Listing/home', {listing, Blog})
})

router.get('/listing', catchAsync(async(req, res, next)=>{
    const listing = await listingModel.find({})
    res.render('Listing/listing', {listing})
}))

/*======================================
//--//-->  🥛  Create New LISTING 🧮 
======================================*/
router.get('/listing/new', isLoggedIn, catchAsync(async(req, res)=>{
 res.render('Listing/new')
}))

router.post('/listing',isLoggedIn, catchAsync(async(req, res)=>{
    const listing = await listingModel(req.body)
    listing.user = req.user._id
   await listing.save()
    req.flash('success', 'Your Listing have successful been posted!')
    // res.send('send')
    res.redirect(`/listing/${listing._id}`)
}))

/*======================================
//--//-->  🥛  GET One LISTING 🧮 
======================================*/
router.get('/listing/:id', isLoggedIn, catchAsync(async(req, res, next)=>{
    const listing = await listingModel.findById(req.params.id).populate('user')
    if (!listing){
        return next(AppError('No Item match this id', 404))
    }
    console.log(listing);
    res.render('Listing/show', {listing})
}))

/*======================================
//--//-->  🥛  Edit Listing 🧮 
======================================*/
router.get('/listing/:id/edit', isLoggedIn, catchAsync(async(req, res)=>{
    const listing = await listingModel.findById(req.params.id)
    res.render('Listing/edit', {listing})
}))

router.put('/listing/:id', catchAsync(async(req, res, next)=>{
    const listingUpdate = await listingModel.findByIdAndUpdate(req.params.id, req.body)
    listingUpdate.save()
    
    console.log(listingUpdate)
    res.redirect(`/Listing/${listingUpdate._id}`)
}))
/*======================================
//--//-->  🥛  Delete a Single ListingByID🧮 
======================================*/
router.delete('/listing/:id', isLoggedIn, catchAsync(async(req, res)=>{
    const listing = await listingModel.findByIdAndDelete(req.params.id)
    listing.save()
    req.flash('error', 'Your Listing have successful been deleted!')
    res.redirect('/Listing')
}))

module.exports = router;