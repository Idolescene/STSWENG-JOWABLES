const cartModel = require('../models/cart');
const productModel = require('../models/product');
const {validationResult} = require('express-validator');

// Gets a user's cart
exports.getUserCart = (req, res) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) {
    var user = req.session.user;
    if (user) {
      cartModel.getByUser(user, (err, result) => {
        if (err) throw err;
        res.render('checkout', {
          title: "Your Cart",
          loggedIn: req.session.user,
          cartProducts: result
        });
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
    var product = req.body.id;
    var user = req.session.user;
    var quantity = 1;

    if (req.body.qty){
      quantity = parseInt(req.body.qty);
    }

    if(!user) {
      console.log(user + ' ' + product); // testing
      res.redirect('/login');
    }
    else {
      if (req.body.btnPressed == "Add to Cart"){
        productModel.getOne({_id: product}, (err, cart) => {
          if (err) throw err;
          var slug = cart.toObject().slug;
          cartModel.addProduct(user, product, quantity, (err, cart) => {
            console.log('cart(addtocart): ' + cart);
            if(err) {
              req.flash('error_msg', 'Could not add product. Please try again.');
              return res.redirect('/product_details/' + slug);
            }
            else {
              req.flash('success_msg', 'You have added a new product to the cart!');
              return res.redirect('/product_details/' + slug);
            }
          });
        });
      }
      else if (req.body.btnPressed = "Add and Checkout"){
        cartModel.addProduct(user, product, quantity, (err, cart) => {
          if(err) {
            req.flash('error_msg', 'Could not add product. Please try again.');
            return res.redirect('/cart');
          }
          else {
            req.flash('success_msg', 'You have added a new product to the cart!');
            return res.redirect('/cart');
          }
        });
      }
    }
  }
};