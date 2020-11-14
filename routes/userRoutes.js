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
  FAQ page
*/
router.get('/faq', (req, res) => {
  res.render('faq', {
    title: "FAQ"
  });
});

module.exports = router;
