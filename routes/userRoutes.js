const router = require('express').Router();
const userModel = require('../models/user');
const cartModel = require('../models/cart');
const orderModel = require('../models/orders');
const aboutModel = require('../models/about');
const questionModel = require('../models/question');
const productModel =  require('../models/product');
const userController = require('../controllers/userController');
const cartController = require('../controllers/cartController');
const productController = require("../controllers/productController");
const orderController = require('../controllers/orderController');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const {userRegisterValidation, userLoginValidation, updateShippingValidation, checkoutShippingValidation, updateEmailValidation, updatePasswordValidation} = require('../validators.js');

/*
  Homepage for both guest and logged in users
*/
router.get('/', productController.getCategories);
router.get('/redirect/:category', (req, res) => {
  req.session.category = req.params.category;
  res.redirect('/catalogue')
})
router.post('/delete-product-confirmation', productController.postAProduct);

/*
  Catalogue page for both guest and logged in users
*/
router.get('/catalogue', productController.getAllProducts);
router.post('/catalogue',productController.refreshProducts);
router.get('/catalogue/:category',productController.getAllProducts);

/*
  Product details page for both guest and logged in users
*/
router.get('/product_details/:slug', productController.getAProduct);
router.post('/product_details/:slug', productController.getAProduct);

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
            questionModel.getQuestions ("", (err, questions) => {
              res.render('faq', {
                title: "FAQ",
                loggedIn: req.session.user,
                cartProducts: result.products,
                questions: questions
              });
            });
          }
          else {
            questionModel.getQuestions ("", (err, questions) => {
              res.render('faq', {
                title: "FAQ",
                loggedIn: req.session.user,
                cartProducts: null,
                questions: questions
              });
            });
          }
        }
      })
    }
    else {
      // if guest
      questionModel.getQuestions ("", (err, questions) => {
        res.render('faq', {
          title: "FAQ",
          loggedIn: req.session.user,
          cartProducts: null,
          questions: questions
        });
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
              phone: "./img/phone-ringing.png",
              media: "./img/social-media.png",
              email: "./img/email.png",
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
              phone: "./img/phone-ringing.png",
              media: "./img/social-media.png",
              email: "./img/email.png",
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
        phone: "./img/phone-ringing.png",
        media: "./img/social-media.png",
        email: "./img/email.png",
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
            order.products.sort();
            order.products.forEach((prod) =>{
              prodlist.push(prod.id);
            });
            productModel.getAllIds(prodlist, (err, products) => {
              var totalPrice = 0;
              var prodArray = [];
              var ordermain = order;
              products.sort();
              order.products.forEach((item, i) => {
                var product;

                products.forEach((prod, j) => {
                  if (prod.id == item.id){
                      product = {
                      name: prod.name,
                      slug: prod.slug,
                      price: prod.price,
                      description: prod.description,
                      category: prod.category,
                      status: prod.status,
                      img: prod.img,
                      qty: item.qty,
                      size: item.size
                    };
                  }
                });

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
                totalPrice: order.totalPrice,
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
            order.products.sort();
            order.products.forEach((prod) =>{
              prodlist.push(prod.id);
            });
            productModel.getAllIds(prodlist, (err, products) => {
              var totalPrice = 0;
              var prodArray = [];
              var ordermain = order;
              products.sort();
              order.products.forEach((item, i) => {
                var product;

                products.forEach((prod, j) => {
                  if (prod.id == item.id){
                      product = {
                      name: prod.name,
                      slug: prod.slug,
                      price: prod.price,
                      description: prod.description,
                      category: prod.category,
                      status: prod.status,
                      img: prod.img,
                      qty: item.qty,
                      size: item.size
                    };
                  }
                });

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
                totalPrice: order.totalPrice,
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
            aboutModel.getAll("", (err, paras) => {
              res.render('about', {
                title: 'About Us',
                paras: paras,
                loggedIn: req.session.user,
                cartProducts: result.products
              });
            });
          }
          else {
            aboutModel.getAll("", (err, paras) => {
              res.render('about', {
                title: 'About Us',
                paras: paras,
                loggedIn: req.session.user,
                cartProducts: null
              });
            });
          }
        }
      })
    }
    else {
      // if guest
      aboutModel.getAll("", (err, paras) => {
        res.render('about', {
          title: 'About Us',
          paras: paras,
          loggedIn: req.session.user,
          cartProducts: null
        });
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
    userModel.getOne({email: regemail}, (err, result) => {
      if(result) {
        req.flash('error_msg', 'User already exists. Please login.');
        res.redirect('/login');
      } else {
        userModel.getOne({username: regun}, (err, result) => {
          if(result) {
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
                  req.flash('error_msg', 'Error creating new account. Please try again.');
                  res.redirect('/login');
                } else {
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
    req.flash('error_msg', messages.join(' '));
    res.redirect('/login');
  }
});

router.post('/user-login', userLoginValidation, (req, res) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) {
    const {logemail, logpass} = req.body;
    userModel.getOne({email: logemail}, (err, user) => {
      if(err) {
        console.log(err); //testing
        res.redirect('/login');
      } else {
        if(user) {
          bcrypt.compare(logpass, user.password, (err, result) => {
            if (result) {
              req.session.user = user._id;
              req.session.username = user.username;
              res.redirect('/');
            } else {
              req.flash('error_msg', 'Incorrect password. Please try again.');
              res.redirect('/login');
            }
          });
        } else {
          //search user via username
          userModel.getOne({username: logemail}, (err, user2) => {
            if(err) {
              console.log(err); //testing
              req.flash('error_msg', 'An error has occurred while searching for a user. Please try again.');
              res.redirect('/login');
            } else {
              if(user2) {
                if(user2.username == "admin") {
                  bcrypt.compare(logpass, user2.password, (err, result) => {
                    if (result) {
                      req.session.user = user2._id;
                      req.session.username = user2.username;
                      req.session.email = user2.email;
                      console.log(req.session);
                      res.redirect('/admin/profile');
                    } else {
                      req.flash('error_msg', 'Incorrect password. Please try again.');
                      res.redirect('/login');
                    }
                  });
                } else {
                  bcrypt.compare(logpass, user2.password, (err, result) => {
                  if (result) {
                    req.session.user = user2._id;
                    req.session.username = user2.username;
                    console.log(req.session);
                    res.redirect('/');
                  } else {
                    req.flash('error_msg', 'Incorrect password. Please try again.');
                    res.redirect('/login');
                  }
                });
                }
              } else {
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
        req.flash('error_msg', 'An error has occurred. Please try again.');
        res.redirect('/profile');
      } else {
        req.flash('success_msg', 'Shipping details updated successfully!');
        res.redirect('/profile');
      }
    });
  } else {
    const messages = errors.array().map((item) => item.msg);
    req.flash('error_msg', messages.join(' '));
    res.redirect('/profile');
  }
});

router.post('/update-user-email', updateEmailValidation, (req, res) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) {
    const {editemail} = req.body;
    var newvals = { $set: {email: editemail} };
    userModel.getOne({email: editemail}, (err, resemail) => {
      if (resemail){
        req.flash('error_msg', 'Email already in use.');
        res.redirect('/profile');
      } else {
        userModel.updateOne({username: req.session.username}, newvals, (err, result) => {
          if (err) {
            req.flash('error_msg', 'An error has occurred. Please try again.');
            res.redirect('/profile');
          } else {
            req.flash('success_msg', 'Email updated successfully!');
            res.redirect('/profile');
          }
        });
      }
    });
  } else {
    const messages = errors.array().map((item) => item.msg);
    req.flash('error_msg', messages.join(' '));
    res.redirect('/profile');
  }
});

router.post('/update-user-password', updatePasswordValidation, (req, res) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) {
    const {editpassword} = req.body;
    const saltRounds = 10;
    bcrypt.hash(editpassword, saltRounds, (err, hashed) => {
      var newvals = { $set: {password: hashed} };
      userModel.updateOne({username: req.session.username}, newvals, (err, result) => {
        if (err) {
          req.flash('error_msg', 'An error has occurred. Please try again.');
          res.redirect('/profile');
        } else {
          req.flash('success_msg', 'Password updated successfully!');
          res.redirect('/profile');
        }
      });
    });
  } else {
    const messages = errors.array().map((item) => item.msg);
    req.flash('error_msg', messages.join(' '));
    res.redirect('/profile');
  }
});

/*Post for Admin*/
router.post('/update-admin-email', (req, res) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) {
    const {editemail} = req.body;
    var newvals = { $set: {email: editemail} };
    userModel.getOne({email: editemail}, (err, resemail) => {
      if (resemail){
        req.flash('error_msg', 'Email already in use.');
        res.redirect('/admin/profile');
      } else {
        userModel.updateOne({username: req.session.username}, newvals, (err, result) => {
          if (err) {
            req.flash('error_msg', 'An error has occurred. Please try again.');
            res.redirect('/profile');
          } else {
            req.flash('success_msg', 'Email updated successfully!');
            res.redirect('/profile');
          }
        });
      }
    });
  } else {
    const messages = errors.array().map((item) => item.msg);
    req.flash('error_msg', messages.join(' '));
    res.redirect('/profile');
  }
});

/*Posts for Shipping Page*/
router.post('/shipping-checkout', checkoutShippingValidation, (req, res) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) {
    var uid = req.session.user;
    const {fullname, contno, houseno, brngy, city, prov, payment} = req.body;
    cartModel.getByUser(uid, (err, cartinfo) => {
      if (!cartinfo){
        req.flash('error_msg', 'No items in your cart.');
        res.redirect('/shipping');
      } else {
        var prodarr = [];
        var today = new Date();
        var orderdate = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
        //var dateformatted = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        cartinfo.products.forEach((item, i) => {
          var pr = item.subPrice / item.qty;
          var prod = {
            id: item.id,
            qty: item.qty,
            size: item.size,
            img: item.img,
            name: item.name,
            price: pr
          };
          prodarr.push(prod);
        });
        var order = {
          products: prodarr,
          date: orderdate,
          status: "Processing",
          user: uid,
          fullname: fullname,
          contactnum: contno,
          housenum: houseno,
          barangay: brngy,
          dateformatted: today,
          city: city,
          province: prov,
          payment: payment,
          totalPrice: cartinfo.total,
          totalWithShipping: cartinfo.totalWithShipping
        }
        orderModel.create( order, (err, result1) => {
          if (err) {
            req.flash('error_msg', 'An error has occurred while creating your order. Please try again.');
            res.redirect('/shipping');
          } else {
            cartModel.deleteByUser( uid, (err, result) => {
              if (err) {
                req.flash('error_msg', 'An error has occurred while finalizing your order. Please try again.');
                res.redirect('/shipping');
              } else {
                order.products.forEach((prod, i) => {
                  productModel.getOne({_id: prod.id}, (err, product) => {
                    if (err) throw err;
                    var stockIndex = product.stock.findIndex(x => x.size == prod.size);
                    var newStock = product.stock
                    newStock[stockIndex].qty = newStock[stockIndex].qty - prod.qty;
                    newStock[stockIndex].status = true;
                    if (newStock[stockIndex].qty == 0)
                      newStock[stockIndex].status = false;
                    productModel.updateOne({_id: prod.id}, {$set: {stock: newStock}}, (err, newprod) => {
                    });
                  });
                });
                req.flash('success_msg', 'Items ordered successfully! Order number: ' + result1.id);
                res.redirect('/shipping');
              }
            });
          }
        });
      }
    });
  } else {
    const messages = errors.array().map((item) => item.msg);
    req.flash('error_msg', messages.join(' '));
    res.redirect('/shipping');
  }
});


module.exports = router;
