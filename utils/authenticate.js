
module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
      req.session.redirectTo = req.path
        req.flash('error', 'Please login Or signIn to access this page')
      return res.redirect('/signUp')
    }
    next()
}

module.exports.isLoggedListing = (req, res, next) =>{
  if(!req.isAuthenticated()){
    req.session.redirectTo = req.path
      req.flash('error', 'Please login Or signIn to post your Listing')
    return res.redirect('/signUp')
  }
  next()
}

module.exports.isLoggedInBlog = (req, res, next) =>{
  if(!req.isAuthenticated()){
    // req.session.redirectTo = req.path
      req.flash('error', 'Please login Or signIn to post your Listing')
    return res.redirect('/blog')
  }
  next()
}
