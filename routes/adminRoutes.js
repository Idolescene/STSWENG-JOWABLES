const router = require('express').Router();
const adminController = require('../controllers/adminController');
const productController = require('../controllers/productController');
const orderModel = require('../models/orders');
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
  orderModel.findNotCancel("", (err, orders) => {
    var inc = 0;
    var totalqty = 0;
    orders.forEach((ord) =>{
      inc = inc + ord.totalPrice;
      ord.products.forEach((prod) => {
        totalqty = totalqty + prod.qty;
      });
    });
    var cap = totalqty * 250;
    var rev = inc - cap;
    res.render('summary-orders', {
      title: "Summary of Finances",
      layout: "admin",
      orders: orders,
      income: inc,
      capital: cap,
      revenue: rev,
      scripts: "/js/summaryorderscript.js"
    });
  });
});

/*
  Summary of All Orders Page with Date Range
*/
router.get('/summary-of-all-orders-:param1-:param2', (req, res) => {
  var datefrom = new Date(req.params.param1.replace(/d/g, '-'));
  var dateto = new Date(req.params.param2.replace(/d/g, '-'));

  orderModel.find({dateformatted: {$gte: datefrom, $lte: dateto}}, (err, orders) => {
    var inc = 0;
    var totalqty = 0;
    orders.forEach((ord) =>{
      inc = inc + ord.totalPrice;
      ord.products.forEach((prod) => {
        totalqty = totalqty + prod.qty;
      });
    });
    var cap = totalqty * 250;
    var rev = inc - cap;
    res.render('summary-orders', {
      title: "Summary of Finances",
      layout: "admin",
      orders: orders,
      income: inc,
      capital: cap,
      revenue: rev,
      scripts: "/js/summaryorderscript.js"
    });
  });
});

/*
  Edit A Product
*/
router.get('/edit-product-details/:slug', productController.getEditProduct);
router.post('/edit-product-post/:_id', productController.postEditProduct);

router.get('/add-new-product', (req, res) => {
  res.render('add-edit-product', {
    layout: "admin",
    buttonStateEdit: "disabled",
    buttonStateAdd: ""
  });
});

/*
  POSTS
*/

//post for summary orders Page
router.post('/update-order-status', (req, res) => {
  var newvals = {$set: {status: req.body.neworder.status}};
  orderModel.update({_id: req.body.neworder.id},  newvals,function(err, order){
    if (err || order == null) {
      req.flash('error_msg', 'An error has occurred while updating order status. Please try again.');
      res.send("");
    } else {
      var message = "Order " + req.body.neworder.id + "'s status has been successfully updated to " + req.body.neworder.status + "!";
      req.flash('success_msg', message);
      res.send("");
    }
  });
});

module.exports = router;
