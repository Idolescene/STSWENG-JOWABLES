const router = require('express').Router();

/*
  Homepage for both guest and logged in users
*/
router.get('/', (req, res) => {
  res.render('home', {
    title: "Testing"
  });
});

/*
  Catalogue page for both guest and logged in users
*/
router.get('/catalogue', (req, res) => {
  res.render('catalogue', {
    title: 'Testing'
  });
});

/*
  Login and Registration Page
*/
router.get('/login', (req, res) => {
  res.render('login', {
    title: "Login and Register"
  });
});

/*
  Frequently Asked Questions Page
*/
router.get('/faq', (req, res) => {
  res.render('faq', {
    title: "FAQ"
  });
});

/*
  Contact Us Page
*/
router.get('/contact', (req, res) => {
  res.render('contact', {
    title: "Contact Us"
  });
});

/*
  Checkout Page
*/
router.get('/checkout', (req, res) => {
  res.render('checkout', {
    title: 'Your Cart'
  });
});

/*
  Shipping Page
*/
router.get('/shipping', (req, res) => {
  res.render('shipping', {
    title: 'Shipping Details and Payment Options'
  });
});

module.exports = router;
