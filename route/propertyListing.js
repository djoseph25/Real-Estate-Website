const express = require('express');
const router = express.Router();
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
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

/***  SECTION Create New listing */
router.get('/listing/new', catchAsync(async(req, res)=>{
    if(!req.isAuthenticated()){
        req.flash('error', 'Please login Or signIn to list your home')
        res.redirect('/signUp')
    }
 res.render('Listing/new')
}))

router.post('/listing', catchAsync(async(req, res)=>{
    const listing = await listingModel(req.body)
    console.log(listing)
    listing.save()
    req.flash('success', 'Your Listing have successful been posted!')
    // res.send('send')
    res.redirect(`/listing/${listing._id}`)
}))

/***  SECTION GET A SINGLE listing */
router.get('/listing/:id', catchAsync(async(req, res, next)=>{
    const listing = await listingModel.findById(req.params.id)
    if (!listing){
        return next(AppError('No Item match this id', 404))
    }
    console.log(listing);
    res.render('Listing/show', {listing})
}))

/***  SECTION Edit listing */
router.get('/listing/:id/edit', catchAsync(async(req, res)=>{
    const listing = await listingModel.findById(req.params.id)
    res.render('Listing/edit', {listing})
}))

router.put('/listing/:id', catchAsync(async(req, res, next)=>{
    const listingUpdate = await listingModel.findByIdAndUpdate(req.params.id, req.body)
    listingUpdate.save()
    
    console.log(listingUpdate)
    res.redirect(`/Listing/${listingUpdate._id}`)
}))
/***  SECTION Delete listing */
router.delete('/listing/:id', catchAsync(async(req, res)=>{
    const listing = await listingModel.findByIdAndDelete(req.params.id)
    listing.save()
    req.flash('error', 'Your Listing have successful been deleted!')
    res.redirect('/Listing')
}))

/*****SECTION CONTACT PAGE */
router.get('/contact', (req, res, next) =>{
    res.render('Listing/contact')
})
/******SECTION ABOUT PAGE */
router.get('/about', (req, res, next) =>{
    res.render('Listing/about')
})


module.exports = router;