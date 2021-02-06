const cartModel = require('../models/cart');
const productModel = require('../models/product');
const {validationResult} = require('express-validator');

// Gets a user's cart
exports.getUserCart = (req, res) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) {
    var user = req.session.user;
    var checkout = true;
    if (user) {
      cartModel.getByUser(user, (err, result) => {
        if (err) throw err;
        if (!result) {
          res.render('checkout', {
            title: "Your Cart",
            loggedIn: req.session.user,
            cartProducts: null,
            checkout: checkout
          });
        }
        else {
          result.products.forEach(element => {
            if (!element.status && checkout){
              checkout = false;
            }
          })
          res.render('checkout', {
            title: "Your Cart",
            loggedIn: req.session.user,
            cartProducts: result.products,
            total: result.total,
            totalWithShipping: result.totalWithShipping,
            checkout: checkout
          });
        }
      });
    }
  }
  else {
    console.log(errors);
  }
}


exports.getACart = (req, res) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) {
    var user = req.session.user;
    if (user) {
      cartModel.getByUser(user, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    }
  }
  else {
    console.log(errors);
  }
}

// Add product to cart
exports.addToCart = (req, res) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) {
    var product = req.params.id;
    var user = req.session.user;
    var quantity = 1;
    var size = req.body.size;

    if (req.body.qty){
      quantity = parseInt(req.body.qty);
    }

    if(!user) {
      res.redirect('/login');
    }
    else {
      if (req.body.btnPressed == "Add to Cart") {
        productModel.getOne({_id: product}, (err, cart) => {
          if (err) throw err;
          var stockIndex = cart.stock.findIndex(x => x.size == size);
          var inStock = cart.stock[stockIndex].status;

          var slug = cart.toObject().slug;
          if (inStock) {
            cartModel.addProduct(user, product, quantity, size,(err, cart) => {
              if(err) {
                req.flash('error_msg', 'Could not add product. Please try again.');
                return res.redirect('/product_details/' + slug);
              }
              else {
                req.flash('success_msg', 'You have added a new product to the cart!');
                return res.redirect('/product_details/' + slug);
              }
            });
          } else {
            req.flash('error_msg', 'Product out of stock.');
            return res.redirect('/product_details/' + slug);
          }
        });
      }
    }
  }
};

// Remove a product from cart
exports.removeFromCart = (req, res) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) {
    var product = req.params.id;
    var user = req.session.user;
    if(!user) {
      res.redirect('/login');
    }
    else {
      // productModel.getOne({_id: product}, (err, result) => {
      //   if (err) throw err;
      //   if (result) {
      //     console.log("-------------- PRODUCT FOUND ------------------");
      //     console.log(result);
      //   }
        cartModel.removeProduct(user, product, (err, cart) => {
          if (err) {
            req.flash('error_msg', 'Something went wrong. Could not remove product. Please try again.');
            return res.redirect('/checkout');
          }
          else {
            req.flash('success_msg', 'You have removed a product from the cart!');
            return res.redirect('/checkout');
          }
        });
      // });
    }
  }
}

// Remove all products from cart
exports.removeAllFromCart = (req, res) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) {
    var user = req.session.user;
    if(!user) {
      res.redirect('/login');
    }
    else {
        cartModel.deleteByUser(user, (err, cart) => {
          if (err) {
            req.flash('error_msg', 'Something went wrong. Could not remove products. Please try again.');
            return res.redirect('/checkout');
          }
          else {
            req.flash('success_msg', 'You have removed all products from the cart!');
            return res.redirect('/checkout');
          }
        });
    }
  }
}
