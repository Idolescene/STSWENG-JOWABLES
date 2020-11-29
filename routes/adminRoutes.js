const router = require('express').Router();


/*
  Admin Homepage and Update Products Page
*/
router.get('/update-products', (req, res) => {
  res.render('update-products', {
    title: "All Products",
    layout: "admin"
  });
});

/*
  Summary of All Orders Page
*/
router.get('/summary-of-all-orders', (req, res) => {
  res. render('summary-orders', {
    title: "Summary of Finances",
    layout: "admin"
  });
});

module.exports = router;