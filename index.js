const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const blogRoute = require('./route/blog')
const listingRoute = require('./route/propertyListing')
const userAuthentication = require('./route/userAuthentication')
const session = require('express-session');
const flash = require('connect-flash')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./model/user');


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(`${__dirname}/public`))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
    secret: 'Thisistopsecret', 
    resave: false,
     saveUninitialized: true, 
     cookie:{
         hhtpOnly: true,
         expires: Date.now() + 604800000,
         maxAge: 604800000
     }
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

//SERIALIZED mean how we get user in the session
passport.serializeUser(User.serializeUser());
//SERIALIZED mean how we get user out of a the session
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

/*======================================
//--//-->  🥛  Blog, listingRoute 🧮 
======================================*/
app.use( blogRoute)
app.use( listingRoute)
app.use(userAuthentication)

app.get('/user', async(req, res)=>{
    const user =  new User({email: 'dave@me.com', username: 'dave90'})
   const newUser = await User.register(user, 'monkey')
    res.send(newUser)
})


/*======================================
//--//-->  🏌  Error Page Handler Route 💇 
======================================*/
app.use('*', (err, req, res,next) => {
    res.status(404).render('Product404')
})
app.use('*', ( req, res) => {
    res.status(404).render('404')
})

/*======================================
//--//-->   Server
======================================*/
app.listen(3000,() =>{
    console.info(`Server listen on port 3000`);
})
