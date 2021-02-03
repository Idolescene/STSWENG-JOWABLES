// imports
// require('dotenv').config();
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const mongoose = require('./models/connection');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
const {envPort, sessionKey} = require('./config');

// initialize express application
const app = express();
const port = envPort || 3000;

app.engine('hbs', exphbs({
  extname: 'hbs',
  defaultView: 'main',
  layoutsDir: path.join(__dirname, '/views/layouts'),
  partialsDir: path.join(__dirname, '/views/partials')
}));

// set up handlebars as template
app.set('view engine', 'hbs');

// set up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// sessions - server configuration
app.use(session({
  secret: sessionKey,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  resave: false,
  saveUninitialized: true.valueOf,
  cookie: {secure: false, maxAge: 1000 * 60 * 60 * 24 * 7}
}));

// flash
app.use(flash());

// global variable messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.isAuthenticated = req.session.user ? true : false;
  next();
});

// initialize routes
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');
const cartRouter = require('./routes/cartRoutes');
const { mongo } = require('./models/connection');

// use routes
app.use('/', userRouter);
app.use('/', cartRouter);
app.use('/admin', adminRouter);

// use express application
app.use(express.static('public'));
app.listen(port, function() {
  console.log('App listening at port ' + port);
});
