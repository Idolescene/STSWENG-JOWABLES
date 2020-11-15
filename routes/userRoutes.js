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