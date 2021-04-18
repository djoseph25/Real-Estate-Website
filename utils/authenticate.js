
module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
      req.session.redirectTo = req.path
        req.flash('error', 'Please login Or signIn to access this page')
      return res.redirect('/signUp')
    }
    next()
}