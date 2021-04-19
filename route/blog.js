const express = require('express');
const router = express.Router();
const {isLoggedIn, isLoggedInBlog} = require('../utils/authenticate');
const blogController = require('../controllers/blogController');


const {
    getAllBlog,
    createBlog,
    postNewBlog,
    getOneBlog,
    editBlog,
    editBlogPut,
    deleteBlog,
    postNewReview,
    deleteReview
   } = blogController;
 

router.get('/blog', getAllBlog)

/***  SECTION Create New Blog */
router.get('/blog/new', 
createBlog)

router.post('/blog', isLoggedIn, postNewBlog)

/*******SECTION GET A SINGLE BLOG */
router.get('/blog/:id', getOneBlog)
/***  SECTION Edit Blog*/
router.get('/blog/:id/edit', isLoggedInBlog, editBlog)

router.put('/blog/:id',  editBlogPut)

router.delete('/blog/:id',isLoggedInBlog,  deleteBlog)

/*******SECTION LEAVE A REVIEW MODEL *********/
router.post('/blog/:id/reviews', isLoggedIn,postNewReview)

router.delete('/blog/:id/reviews/:reviewId', isLoggedIn, deleteReview)

module.exports = router;