const express = require('express');
const router = express.Router();
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const {blogModel} = require('../model/listingBlogModel');
const reviewModel= require('../model/reviewModel');
router.get('/blog', catchAsync(async(req, res, next)=>{
const Blog = await blogModel.find({})
console.log(Blog)
res.render('Blog/blog', {Blog})
}))

/***  SECTION Create New Blog */
router.get('/blog/new', 
catchAsync(async(req, res)=>{
res.render('Blog/new')
}))

router.post('/blog', catchAsync(async(req, res)=>{
    const newPost = await blogModel(req.body)
    // console.log(newPost)
    // res.send('posted')
    newPost.save()
    res.redirect(`/blog/${newPost._id}`)
}))

/*******SECTION GET A SINGLE BLOG */
router.get('/blog/:id', catchAsync(async(req, res)=>{
    const blog = await (await blogModel.findById(req.params.id).populate('reviews')).populate('user')
    console.log(blog);
    res.render('Blog/show', {blog})
}))
/***  SECTION Edit Blog*/
router.get('/blog/:id/edit', catchAsync(async(req, res)=>{
    const blog = await blogModel.findById(req.params.id)
    res.render('Blog/edit', {blog})
}))

router.put('/blog/:id', catchAsync(async(req, res, next)=>{
    const blogUpdate = await blogModel.findByIdAndUpdate(req.params.id, req.body)
    blogUpdate.save()
    console.log(blogUpdate)
    res.redirect(`/blog/${blogUpdate._id}`)
}))

router.delete('/blog/:id', catchAsync(async(req, res)=>{
    const blog = await blogModel.findByIdAndDelete(req.params.id)
    blog.save()
    res.redirect('/blog')
}))

/*******SECTION LEAVE A REVIEW MODEL *********/
router.post('/blog/:id/reviews', catchAsync(async(req, res)=>{
const blog = await blogModel.findById(req.params.id)
const review = new reviewModel(req.body)
blog.reviews.push(review)
await review.save()
await blog.save()
console.log(blog)
res.redirect(`/blog/${blog._id}`)
}))

router.delete('/blog/:id/reviews/:reviewId', catchAsync(async(req, res)=>{
    const {id, reviewId} = req.params
    await blogModel.findByIdAndUpdate(id, {$pull:{reviews:reviewId}})
    await reviewModel.findByIdAndDelete(reviewId)
    res.redirect(`/blog/${id}`)
}))

module.exports = router;