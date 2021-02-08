const router = require('express').Router();
const adminController = require('../controllers/adminController');
const productController = require('../controllers/productController');
const orderModel = require('../models/orders');
const questionModel = require('../models/question');
const aboutModel = require('../models/about');
const validationResult = require('express-validator');
const productModel =  require('../models/product');
const multer = require('multer');
const {adminEmailValidation, adminPasswordValidation} = require('../validators.js');


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({storage: storage});

/*
  Admin profile page
*/
router.get('/profile', (req, res) => {
  console.log(req.session.user);
  res.render('profile-admin', {
    title: 'profile',
    id: req.session.user,
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

  orderModel.find({dateformatted: {$gte: datefrom, $lte: dateto}, status: {$not: {$regex: "^Cancelled$"}}}, (err, orders) => {
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

/*
  Add A Product
*/
router.get('/add-new-product', productController.getAddProduct);

/*
  Delete A Product
*/
router.get('/delete-product/:_id', productController.deleteProduct);
router.get('/confirm-delete/:slug', productController.getProductToDelete);

/*
  Contact Page
*/
router.get('/contact-us', (req, res) => {
  res.render('contact', {
    title: "Contact Us",
    fblink: "www.facebook.com/SalawalCo",
    iglink: "www.instagram.com/SalawalCo",
    phonenum: "+ 63 961 801 4235",
    email: "salawalco.ph@gmail.com",
    phone: "../img/phone-ringing.png",
    media: "../img/social-media.png",
    email: "../img/email.png",
    loggedIn: req.session.user,
    layout: "admin"
  });
});

/*
  About Page
*/
router.get('/about-us', (req, res) => {
  aboutModel.getAll("", (err, paras) => {
    res.render('about', {
      title: 'About Us',
      paras: paras,
      loggedIn: req.session.user,
      layout: "admin"
    });
  });
})

/*
  FAQ Page
*/
router.get('/faq', (req, res) => {
  questionModel.getQuestions ("", (err, questions) => {
    res.render('faq', {
      title: "FAQ",
      layout: "admin",
      loggedIn: req.session.user,
      questions: questions
    });
  });
})

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

//post for summary orders Page
router.post('/update-order-status-cancel', (req, res) => {
  var newvals = {$set: {status: req.body.neworder.status}};
  orderModel.update({_id: req.body.neworder.id},  newvals,function(err, order){
    if (err || order == null) {
      req.flash('error_msg', 'An error has occurred while updating order status. Please try again.');
      res.send("");
    } else {
      orderModel.getOne({_id: req.body.neworder.id}, function(err, ord) {
        ord.products.forEach((prod, i) => {
          productModel.getOne({_id: prod.id}, (err, product) => {
            if (err) throw err;
            var stockIndex = product.stock.findIndex(x => x.size == prod.size);
            var newStock = product.stock
            newStock[stockIndex].qty = newStock[stockIndex].qty + prod.qty;
            newStock[stockIndex].status = true;
            if (newStock[stockIndex].qty == 0)
              newStock[stockIndex].status = false;
            productModel.updateOne({_id: prod.id}, {$set: {stock: newStock}}, (err, newprod) => {
            });
          });
        });
      });
      var message = "Order " + req.body.neworder.id + "'s status has been successfully updated to " + req.body.neworder.status + "!";
      req.flash('success_msg', message);
      res.send("");
    }
  });
});

router.post('/edit-product-post/:_id', upload.single('image'), productController.postEditProduct);

router.post('/add-product-post', upload.single('image'), productController.postAddProduct);

router.post('/edit-admin-email/:_id', adminEmailValidation, adminController.postEditAdminEmail);

router.post('/edit-admin-password/:_id', adminPasswordValidation, adminController.postEditAdminPassword);

module.exports = router;
