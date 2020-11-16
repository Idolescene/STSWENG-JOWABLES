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

module.exports = router;
router.get('/faq', (req, res) => {
  res.render('faq', {
    title: "FAQ"
  });
});

router.get('/contact', (req, res) => {
  res.render('contact', {
    title: "Contact Us"
  });
});

module.exports = router;
