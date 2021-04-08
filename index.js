const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const blogRoute = require('./route/blog')
const listingRoute = require('./route/propertyListing')
const {blogModel, listingModel} = require('./model/listingBlogModel')
var http = require('http');
/**
 sp-app	Create a simple express
sp-router	Create a router to export
sp-req	Snippet to require a module
sp-rf	Generate a route function
sp-ra	Generate a route arrow function
sp-vp	Generate set view folder
sp-ve  Generate set view engine
 */

// app.set('port', process.env.port || 3000) 
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(`${__dirname}/public`))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended:true}))

app.use('/', blogRoute)
app.use('/', listingRoute)

/******SECTION HOME PAGE */
app.get('/', async (req, res, next) =>{
    const listing = await listingModel.find()
    const Blog = await blogModel.find()
    console.log(listing);
    // console.log(blog);
    res.render('Listing/home', {listing, Blog})
})
/******SECTION CONTACT PAGE */
app.get('/contact', (req, res, next) =>{
    res.render('Listing/contact')
})
app.get('/test',async (req, res, next)=>{
    const Blog = await blogModel.find()
    res.render('test', {Blog})
})

/******SECTION ABOUT PAGE */
app.get('/about', (req, res, next) =>{
    res.render('Listing/about')
})

app.listen(3000,() =>{
    console.info(`Server listen on port 3000`);
})