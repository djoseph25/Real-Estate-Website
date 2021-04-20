const express = require('express');
const router = express.Router();
const {isLoggedIn, isLoggedListing} = require('../utils/authenticate')
const listingController = require('../controllers/listingController');
const {storage} = require('../cloudinary')
var multer  = require('multer')
var upload = multer({storage})

const {
   getAllListing,
   getListing,
   createListing,
   postNewListing,
   getOneListing,
   editListing,
   editListingPut,
   deleteListing
  } = listingController;

/*======================================
//--//-->  🥛  GET ALL LISTING ROUTE🧮 
======================================*/
router.get('/', getAllListing)

router.get('/listing', getListing)

/*======================================
//--//-->  🥛  Create New LISTING 🧮 
======================================*/
router.get('/listing/new', createListing)
// router.post('/listing', upload.array('image'),(req, res)=>{
//   console.log(req.body, req.files)
//   res.send('It Worked')
// })
router.post('/listing', upload.array('image'), postNewListing )

/*======================================
//--//-->  🥛  GET One LISTING 🧮 
======================================*/
router.get('/listing/:id', isLoggedIn, getOneListing)

/*======================================
//--//-->  🥛  Edit Listing 🧮 
======================================*/
router.get('/listing/:id/edit',editListing)

router.put('/listing/:id',upload.array('image'), editListingPut)

/*======================================
//--//-->  🥛  Delete a Single ListingByID🧮 
======================================*/
router.delete('/listing/:id', isLoggedIn, deleteListing)

module.exports = router;