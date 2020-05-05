require('dotenv').config()
const config = require('config');
const express = require ('express');
const bodyParser = require ('body-parser');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require ('mongoose');
const home = require('./routes/home');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// Passport config

require('./config/passport')(passport);

const PORT = process.env.PORT || 3000;
if(!config.get("jwtPrivateKey"))
{
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}


// DB Config
const db = require('./config/database').database;
mongoose.set("useCreateIndex", true);

// Connect to DB
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log(err));



//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Express session

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect flash

app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});



app.get('*', function(req, res, next) {
  res.locals.user = req.user || null;
  next();
})

// Routes
app.use('/users', require('./routes/users'));
app.use('/', home);



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
})
