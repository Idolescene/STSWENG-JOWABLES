const router = require('express').Router();
const adminController = require('../controllers/adminController');
const productController = require('../controllers/productController');
const validationResult = require('express-validator');

/*
  Admin profile page
*/
router.get('/profile', (req, res) => {
  console.log(req.session.user);
  res.render('profile-admin', {
    title: 'profile',
    loggedIn: req.session.user,
    layout: 'admin'
  });
});

router.get('/logout-admin', adminController.logoutAdmin);

/*
  Admin Homepage and Update Products Page
*/
router.get('/update-products', productController.viewAllProducts);

/*
  Summary of All Orders Page
*/
router.get('/summary-of-all-orders', (req, res) => {
  res. render('summary-orders', {
    title: "Summary of Finances",
    layout: "admin"
  });
});

// router.get('/edit-product-details/:slug', (req, res) => {
  router.get('/edit-product-details', (req, res) => {
  res.render('edit-product', {
    title: "Edit product details of ",
    layout: "admin"
  })
})



module.exports = router;
