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
    // console.log(newUser)
    req.login(newUser, err=>{
       if(err){
           res.redirect('signUp')
       } else{
        res.redirect('/')    
       }
      
    }) 
    
    } catch(e){
        req.flash('error', `${e.message}, please SignIn`)
      res.redirect('signUp')

    }
    
}))

/*======================================
//--//-->  🥛  LogIn A User 🧮 
======================================*/
router.get('/login', catchAsync(async(req, res)=>{
    // console.log(req.body)
    res.redirect('/')
}))

router.post('/login', passport.authenticate('local',
 {failureFlash:true, failureRedirect:'/signUp'}), (req, res)=>{
const returnTo = req.session.redirectTo || '/'
res.redirect(returnTo)
})

/*======================================
//--//-->  🥛  LogOut A User 🧮 
======================================*/
router.get('/logout', (req, res)=>{
    req.logout()
    res.redirect('/')
})
module.exports = router;
// 607c9fe51bd714260887f35c User ID