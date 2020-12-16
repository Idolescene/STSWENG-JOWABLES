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

/*
  Edit About Us Page
*/
router.get('/edit-aboutus', (req, res) => {
  res. render('edit-aboutus', {
    title: "Edit About Us",
    layout: "admin"
  });
});

/*
  Edit FAQ Page
*/
router.get('/edit-faq', (req, res) => {
  res. render('edit-faq', {
    title: "Edit FAQ",
    layout: "admin"
  });
});

/*
  Edit Contact Us Page
*/
router.get('/edit-contact', (req, res) => {
  res. render('edit-contact', {
    title: "Edit Contact Us",
    layout: "admin"
  });
});



module.exports = router;
