// imports
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');

// initialize express application
const app = express();
const port = 3000;

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

// initialize routes
const userRouter = require('./routes/userRoutes');

// use routes
app.use('/', userRouter);
app.use('/faq', userRouter);

// use express application
app.use(express.static('public'));
app.listen(port, function() {
  console.log('App listening at port ' + port);
});
