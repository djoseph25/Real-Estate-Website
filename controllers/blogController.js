const express = require('express');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const {blogModel} = require('../model/listingBlogModel');
const reviewModel= require('../model/reviewModel');

/*======================================
//--//-->  🥛  Get All Blog🧮 
======================================*/
exports.getAllBlog = catchAsync(async(req, res, next)=>{
const Blog = await blogModel.find({})
console.log(Blog)
res.render('Blog/blog', {Blog})
})

/*======================================
//--//-->  🥛  Create New Blog🧮 
======================================*/
exports.createBlog=
catchAsync(async(req, res)=>{
res.render('Blog/new')
})

exports.postNewBlog = catchAsync(async(req, res)=>{
    const blog = await blogModel(req.body)
    blog.user = req.user._id
    blog.save()
    res.redirect(`/blog/${blog._id}`)
})

/*======================================
//--//-->  🥛  Get A Single Blog🧮 
======================================*/
exports.getOneBlog = catchAsync(async(req, res)=>{
    const blog = await blogModel.findById(req.params.id).populate
    ({path:'reviews', populate:{
        path:'user'
    }})
    console.log(blog);
    res.render('Blog/show', {blog})
})
/*======================================
//--//-->  🥛  Edit Blog🧮 
======================================*/
exports.editBlog = catchAsync(async(req, res)=>{
    const blog = await blogModel.findById(req.params.id)
    res.render('Blog/edit', {blog})
})

exports.editBlogPut = catchAsync(async(req, res, next)=>{
    const blogUpdate = await blogModel.findByIdAndUpdate(req.params.id, req.body)
    blogUpdate.save()
    console.log(blogUpdate)
    res.redirect(`/blog/${blogUpdate._id}`)
})
/*======================================
//--//-->  🥛  Delete Blog🧮 
======================================*/
exports.deleteBlog = catchAsync(async(req, res)=>{
    const blog = await blogModel.findByIdAndDelete(req.params.id)
    const returnTo = req.session.redirectTo || '/blog'
    blog.save()
    res.redirect(returnTo)
})

/*======================================
//--//-->  🥛  Post Review🧮 
======================================*/
exports.postNewReview = catchAsync(async(req, res)=>{
const blog = await blogModel.findById(req.params.id)
const review = new reviewModel(req.body)
review.user = req.user._id
blog.reviews.push(review)
await review.save()
await blog.save()
console.log(blog)
res.redirect(`/blog/${blog._id}`)
})
/*======================================
//--//-->  🥛  Delete Review🧮 
======================================*/
exports.deleteReview = catchAsync(async(req, res)=>{
    const {id, reviewId} = req.params
    await blogModel.findByIdAndUpdate(id, {$pull:{reviews:reviewId}})
    await reviewModel.findByIdAndDelete(reviewId)
    res.redirect(`/blog/${id}`)
})
