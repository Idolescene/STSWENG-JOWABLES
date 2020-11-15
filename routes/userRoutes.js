const router = require('express').Router();

/*
  Homepage for both guest and logged in users
*/
router.get('/', (req, res) => {
  res.render('home', {
    title: "Testing"
  });
});

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
