const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const {listingModel, blogModel} = require('../model/listingBlogModel');

/*======================================
//--//-->  🥛  GET ALL LISTING ROUTE🧮 
======================================*/
exports.getAllListing = async (req, res, next) =>{
    const listing = await listingModel.find()

    const Blog = await blogModel.find()
      res.render('Listing/home', {listing, Blog})
}

exports.getListing = catchAsync(async(req, res, next)=>{
    const listing = await listingModel.find({})
    res.render('Listing/listing', {listing})
})

/*======================================
//--//-->  🥛  Create New LISTING 🧮 
======================================*/

exports.createListing = catchAsync(async(req, res)=>{
    res.render('Listing/new')
   })

exports.postNewListing = catchAsync(async(req, res)=>{
    const listing = await listingModel(req.body)
    listing.images = req.files.map(image=>({url:image.path, filename: image.filename}))
    listing.user = req.user._id
   await listing.save()
   console.log(listing)
    req.flash('success', 'Your Listing have successful been posted!')
    // res.send('send')
    res.redirect(`/listing/${listing._id}`)
})
/*======================================
//--//-->  🥛  GET One LISTING 🧮 
======================================*/
exports.getOneListing = catchAsync(async(req, res, next)=>{
    const listing = await listingModel.findById(req.params.id).populate('user')
    if (!listing){
        return next(AppError('No Item match this id', 404))
    }
    console.log(listing);
    res.render('Listing/show', {listing})
})

/*======================================
//--//-->  🥛  Edit Listing 🧮 
======================================*/
exports.editListing= catchAsync(async(req, res)=>{
    const listing = await listingModel.findById(req.params.id)
    res.render('Listing/edit', {listing})
})

// // ADD MORE IMAGE TO EXISTING FILE
// exports.editListingPut = catchAsync(async(req, res)=>{
//     const listing = await listingModel.findByIdAndUpdate(req.params.id,req.body)
//     const imgs = req.files.map(image=>({url:image.path, filename: image.filename}))
//     listing.images.push( ...imgs)
//     await listing.save()
//     console.log(listing)
//     res.redirect(`/Listing/${listing._id}`)
// })
exports.editListingPut = catchAsync(async(req, res)=>{
    const listing = await listingModel.findByIdAndUpdate(req.params.id,req.body)
    listing.images = req.files.map(image=>({url:image.path, filename: image.filename}))
    await listing.save()
    console.log(listing)
    res.redirect(`/Listing/${listing._id}`)
})
/*======================================
//--//-->  🥛  Delete a Single ListingByID🧮 
======================================*/
exports.deleteListing = catchAsync(async(req, res)=>{
    const listing = await listingModel.findByIdAndDelete(req.params.id)
    listing.save()
    req.flash('error', 'Your Listing have successful been deleted!')
    res.redirect('/Listing')
})