const express = require('express');
const router = express.Router();
const {isLoggedIn, isLoggedListing} = require('../utils/authenticate')
const listingController = require('../controllers/listingController');

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
router.get('/listing/new', isLoggedListing, createListing)

router.post('/listing',isLoggedListing, postNewListing )

/*======================================
//--//-->  🥛  GET One LISTING 🧮 
======================================*/
router.get('/listing/:id', isLoggedIn, getOneListing)

/*======================================
//--//-->  🥛  Edit Listing 🧮 
======================================*/
router.get('/listing/:id/edit', isLoggedIn, editListing)

router.put('/listing/:id', editListingPut)

/*======================================
//--//-->  🥛  Delete a Single ListingByID🧮 
======================================*/
router.delete('/listing/:id', isLoggedIn, deleteListing)

module.exports = router;