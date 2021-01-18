const router = require('express').Router();
const userModel = require('../models/user');
const cartModel = require('../models/cart');
const orderModel = require('../models/orders');
const productModel =  require('../models/product');
const userController = require('../controllers/userController');
const cartController = require('../controllers/cartController');
const productController = require("../controllers/productController");
const orderController = require('../controllers/orderController');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const {userRegisterValidation, userLoginValidation, updateShippingValidation, checkoutShippingValidation} = require('../validators.js');

/*
  Homepage for both guest and logged in users
*/
router.get('/', productController.getCategories);

/*
  Catalogue page for both guest and logged in users
*/
router.get('/catalogue', productController.getAllProducts);
router.post('/catalogue',productController.refreshProducts);

/*
  Product details page for both guest and logged in users
*/
router.get('/product_details/:slug', productController.getAProduct);

/*
  Login and Registration Page
*/
router.get('/login', (req, res) => {
  res.render('login', {
    title: "Login and Register",
    scripts: ""
  });
});

/*
  Frequently Asked Questions Page
*/
router.get('/faq', (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    var user = req.session.user;
    if (user) {
      // if user
      cartModel.getByUser(user, (err, result) => {
        if (err) {
          console.log(err);
        }
        else {
          if (result) {
            res.render('faq', {
              title: "FAQ",
              question: "What is this question?",
              answer: "Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer.",
              loggedIn: req.session.user,
              cartProducts: result.products
            });
          }
          else {
            res.render('faq', {
              title: "FAQ",
              question: "What is this question?",
              answer: "Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer.",
              loggedIn: req.session.user,
              cartProducts: null
            });
          }
        }
      })
    }
    else {
      // if guest
      res.render('faq', {
        title: "FAQ",
        question: "What is this question?",
        answer: "Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer.",
        loggedIn: req.session.user,
        cartProducts: null
      });
    }
  }
});

/*
  Contact Us Page
*/
router.get('/contact', (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    var user = req.session.user;
    if (user) {
      // if user
      cartModel.getByUser(user, (err, result) => {
        if (err) {
          console.log(err);
        }
        else {
          if (result) {
            res.render('contact', {
              title: "Contact Us",
              fblink: "www.facebook.com/SalawalCo",
              iglink: "www.instagram.com/SalawalCo",
              phonenum: "+ 63 961 801 4235",
              email: "salawalco.ph@gmail.com",
              loggedIn: req.session.user,
              cartProducts: result.products
            });
          }
          else {
            res.render('contact', {
              title: "Contact Us",
              fblink: "www.facebook.com/SalawalCo",
              iglink: "www.instagram.com/SalawalCo",
              phonenum: "+ 63 961 801 4235",
              email: "salawalco.ph@gmail.com",
              loggedIn: req.session.user,
              cartProducts: null
            });
          }
        }
      })
    }
    else {
      // if guest
      res.render('contact', {
        title: "Contact Us",
        fblink: "www.facebook.com/SalawalCo",
        iglink: "www.instagram.com/SalawalCo",
        phonenum: "+ 63 961 801 4235",
        email: "salawalco.ph@gmail.com",
        loggedIn: req.session.user,
        cartProducts: null
      });
    }
  }
});

/*
  Checkout Page
*/
router.get('/checkout', cartController.getUserCart);

/*
  Order Information Page
*/
router.get('/order-information-:param', (req, res) => {
  var user = req.session.user;
  var orderid = req.params.param;

  if (user) {
    cartModel.getByUser(user, (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        if (result) {
          orderModel.getOne({_id: orderid}, (err, order) => {
            var prodlist = [];
            order.products.forEach((prod) =>{
              prodlist.push(prod.id);
            });
            productModel.getAllIds(prodlist, (err, products) => {
              var totalPrice = 0;
              var prodArray = [];
              var ordermain = order;
              products.forEach((item, i) => {
                var product = {
                  name: item.name,
                  slug: item.slug,
                  price: item.price,
                  description: item.description,
                  category: item.category,
                  status: item.status,
                  img: item.img,
                  qty: order.products[i].qty,
                  size: order.products[i].size
                };
        
                totalPrice = totalPrice + product.price * product.qty;
                prodArray.push(product);
              });
        
              var avesize = prodArray[0].size;
              prodArray.forEach((item) => {
                if (avesize != item.size)
                  avesize = "Assorted";
              })
        
              res.render('orderinformation', {
                title: "Order Information",
                loggedIn: req.session.user,
                order: order.toObject(),
                totalPrice: totalPrice,
                products: prodArray,
                avesize: avesize,
                cartProducts: result.products
              });
            });
          });
        }
        else {
          orderModel.getOne({_id: orderid}, (err, order) => {
            var prodlist = [];
            order.products.forEach((prod) =>{
              prodlist.push(prod.id);
            });
            productModel.getAllIds(prodlist, (err, products) => {
              var totalPrice = 0;
              var prodArray = [];
              var ordermain = order;
              products.forEach((item, i) => {
                var product = {
                  name: item.name,
                  slug: item.slug,
                  price: item.price,
                  description: item.description,
                  category: item.category,
                  status: item.status,
                  img: item.img,
                  qty: order.products[i].qty,
                  size: order.products[i].size
                };
        
                totalPrice = totalPrice + product.price * product.qty;
                prodArray.push(product);
              });
        
              var avesize = prodArray[0].size;
              prodArray.forEach((item) => {
                if (avesize != item.size)
                  avesize = "Assorted";
              })
        
              res.render('orderinformation', {
                title: "Order Information",
                loggedIn: req.session.user,
                order: order.toObject(),
                totalPrice: totalPrice,
                products: prodArray,
                avesize: avesize,
                cartProducts: null
              });
            });
          });
        }
      }
    })
  }
});


/*
  Shipping Page
*/
router.get('/shipping', (req, res) => {
  var user = req.session.username;

  userModel.getOne({username: user}, (err, user) => {
     if (err) {
      console.log('There is an error when searching for a user.');
     }
     if (user)  {
       // if user
       cartModel.getByUser(user, (err, result) => {
         if (err) {
           console.log(err);
         }
         else {
          if(result) {
            res.render('shipping', {
              title: 'Shipping Details and Payment Options',
              scripts: "js/shippingscript.js",
              fullname: user.fullname,
              contactnum: user.contactnum,
              email: user.email,
              housenum: user.housenum,
              barangay: user.barangay,
              city: user.city,
              province: user.province,
              loggedIn: req.session.user,
              cartProducts: result.products
            });
          }
          else {
            res.render('shipping', {
              title: 'Shipping Details and Payment Options',
              scripts: "js/shippingscript.js",
              fullname: user.fullname,
              contactnum: user.contactnum,
              email: user.email,
              housenum: user.housenum,
              barangay: user.barangay,
              city: user.city,
              province: user.province,
              loggedIn: req.session.user,
              cartProducts: null
            });
          }
         }
       })
     } else {
       // if guest
       res.render('shipping', {
         title: 'Shipping Details and Payment Options',
         scripts: "js/shippingscript.js",
         fullname: "",
         contactnum: "",
         email: "",
         housenum: "",
         barangay: "",
         city: "",
         province: "",
         loggedIn: req.session.user,
         cartProducts: null
       });
     }
   });
});

/*
  Profile Page
*/
router.get('/profile', orderController.getUserOrders);

/*
  About Us Page
*/
router.get('/about', (req,res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    var user = req.session.user;
    if (user) {
      // if user
      cartModel.getByUser(user, (err, result) => {
        if (err) {
          console.log(err);
        }
        else {
          if(result) {
            res.render('about', {
              title: 'About Us',
              story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in fermentum orci. Aenean blandit massa tincidunt est interdum tempor. Sed ut consequat quam.',
              about: 'De kalidad na mga salawal na gawang Bulacan.',
              loggedIn: req.session.user,
              cartProducts: result.products
            });
          }
          else {
            res.render('about', {
              title: 'About Us',
              story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in fermentum orci. Aenean blandit massa tincidunt est interdum tempor. Sed ut consequat quam.',
              about: 'De kalidad na mga salawal na gawang Bulacan.',
              loggedIn: req.session.user,
              cartProducts: null
            });
          }
        }
      })
    }
    else {
      // if guest
      res.render('about', {
        title: 'About Us',
        story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in fermentum orci. Aenean blandit massa tincidunt est interdum tempor. Sed ut consequat quam.',
        about: 'De kalidad na mga salawal na gawang Bulacan.',
        loggedIn: req.session.user,
        cartProducts: null
      });
    }
  }
});

/*
  Logout a user
*/
router.get('/logout', userController.logoutUser);

/*POSTS*/
/*Posts for Login Page*/
router.post('/user-register', userRegisterValidation, (req, res) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) {
    const {regfn, regun, regemail, regpass} = req.body;
    //console.log(req.body.name); //testing
    userModel.getOne({email: regemail}, (err, result) => {
      if(result) {
        console.log(result); //testing
        console.log('User already exists.') //testing
        req.flash('error_msg', 'User already exists. Please login.');
        res.redirect('/login');
      } else {
        userModel.getOne({username: regun}, (err, result) => {
          if(result) {
            console.log(result); //testing
            console.log('User already exists.') //testing
            req.flash('error_msg', 'User already exists. Please login.');
            res.redirect('/login');
          } else {
            var today = new Date();
            var accntdate = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
            const saltRounds = 10;
            bcrypt.hash(regpass, saltRounds, (err, hashed) => {
              const newUser = {
                fullname: regfn,
                username: regun,
                email: regemail,
                password: hashed,
                datejoined: accntdate,
                contactnum: "NONE",
                housenum: "NONE",
                barangay: "NONE",
                city: "NONE",
                province: "NONE",
              };
              userModel.create(newUser, (err, user) => {
                if(err) {
                  console.log('Error creating new account.'); //testing
                  req.flash('error_msg', 'Error creating new account. Please try again.');
                  res.redirect('/login');
                } else {
                  console.log(user); //testing
                  console.log("Registration successful."); //testing
                  req.flash('success_msg', 'Registration successful! Please login.');
                  res.redirect('/login');
                }
              });
            });
          }
        });
      }
    });
  } else {
    const messages = errors.array().map((item) => item.msg);
    console.log(messages.join(' ')); //testing
    req.flash('error_msg', messages.join(' '));
    res.redirect('/login');
  }
});

router.post('/user-login', userLoginValidation, (req, res) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) {
    const {logemail, logpass} = req.body;
    //console.log(req.body.name); //testing
    // search user via email
    userModel.getOne({email: logemail}, (err, user) => {
      if(err) {
        console.log(err); //testing
        console.log('An error has occurred while searching for a user.') //testing
        res.redirect('/login');
      } else {
        if(user) {
          bcrypt.compare(logpass, user.password, (err, result) => {
            if (result) {
              req.session.user = user._id;
              req.session.username = user.username;
              console.log(req.session);
              res.redirect('/');
            } else {
              console.log('Incorrect password. Please try again.'); //testing
              req.flash('error_msg', 'Incorrect password. Please try again.');
              res.redirect('/login');
            }
          });
        } else {
          //search user via username
          userModel.getOne({username: logemail}, (err, user2) => {
            if(err) {
              console.log(err); //testing
              console.log('An error has occurred while searching for a user.') //testing
              req.flash('error_msg', 'An error has occurred while searching for a user. Please try again.');
              res.redirect('/login');
            } else {
              if(user2) {
                bcrypt.compare(logpass, user2.password, (err, result) => {
                  if (result) {
                    req.session.user = user2._id;
                    req.session.username = user2.username;
                    console.log(req.session);
                    res.redirect('/');
                  } else {
                    console.log('Incorrect password. Please try again.'); //testing
                    req.flash('error_msg', 'Incorrect password. Please try again.');
                    res.redirect('/login');
                  }
                });
              } else {
                console.log('User not found. Please try again.'); //testing
                req.flash('error_msg', 'User not found. Please try again.');
                res.redirect('/login');
              }
            }
          });
        }
      }
    });
  } else {
    const messages = errors.array().map((item) => item.msg);
    req.flash('error_msg', messages.join(' '));
    console.log(messages.join(' ')); //testing
    res.redirect('/login');
  }
});

/*Posts for Profile Page*/
router.post('/update-user-shipping', updateShippingValidation, (req, res) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) {
    const {fullname, contno, houseno, brngy, city, prov} = req.body;
    var newvals = { $set: {fullname: fullname, contactnum: contno, housenum: houseno, barangay: brngy, city: city, province: prov} };
    userModel.updateOne({username: req.session.username}, newvals, (err, result) => {
      if (err) {
        console.log(err); //testing
        console.log('An error has occurred while searching for a user.') //testing
        req.flash('error_msg', 'An error has occurred while searching for a user. Please try again.');
        res.redirect('/profile');
      } else {
        console.log('Shipping details updated successfully!') //testing
        req.flash('success_msg', 'Shipping details updated successfully!');
        res.redirect('/profile');
      }
    });
  } else {
    const messages = errors.array().map((item) => item.msg);
    console.log(messages.join(' ')); //testing
    req.flash('error_msg', messages.join(' '));
    res.redirect('/profile');
  }
});

/*Posts for Shipping Page*/
router.post('/shipping-checkout', checkoutShippingValidation, (req, res) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) {
    const {fullname, contno, houseno, brngy, city, prov} = req.body;
    //stuff
    res.redirect('/shipping');
  } else {
    const messages = errors.array().map((item) => item.msg);
    console.log(messages.join(' ')); //testing
    req.flash('error_msg', messages.join(' '));
    res.redirect('/shipping');
  }
});


module.exports = router;
