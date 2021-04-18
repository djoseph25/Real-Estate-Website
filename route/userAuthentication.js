const express = require('express');
const router = express.Router();
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('../model/user')
const passport = require('passport')

router.get('/signUp', catchAsync(async(req, res)=>{
    console.log(req.body)
res.render('User/signUp')
}))

/*======================================
//--//-->  🥛  Create A New User 🧮 
======================================*/
router.post('/signUp', catchAsync(async(req, res)=>{
    try{
     const {username, email, password} = req.body
    const user = new User({email, username})
    const newUser = await User.register(user, password)   
    res.redirect('/')
    } catch(e){
        req.flash('error', e.message)
      res.redirect('signUp')

    }
    
}))


router.get('/login', catchAsync(async(req, res)=>{
    console.log(req.body)
    res.redirect('/')
}))

router.post('/login', passport.authenticate('local', {failureFlash:true, failureRedirect:'/signUp'}), (req, res)=>{
req.flash('success', 'Welcome back')
res.redirect('listing')
})

module.exports = router;