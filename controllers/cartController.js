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
        console.log(result.products)
        if (err) throw err;
        result.products.forEach(element => {
          if (!element.status && checkout == true)
          {
            checkout = false;
            console.log('beep')
          }
          console.log(checkout)
        });
        if (!result) {
          res.render('checkout', {
            title: "Your Cart",
            loggedIn: req.session.user,
            cartProducts: null,
            checkout: checkout
          });
        }
        else {
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
        console.log(result);
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

    console.log(product);
    console.log(user);

    if (req.body.qty){
      quantity = parseInt(req.body.qty);
    }

    if(!user) {
      console.log(user + ' ' + product); // testing
      res.redirect('/login');
    }
    else {
      if (req.body.btnPressed == "Add to Cart") {
        productModel.getOne({_id: product}, (err, cart) => {
          if (err) throw err;
          console.log(cart);

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
      cartModel.removeProduct(user, product, (err, cart) => {
        if (err) {
          req.flash('error_msg', 'Something went wrong. Could not remove product. Please try again.');
          return res.redirect('/checkout');
        } 
        else {
          req.flash('success_msg', 'You have removed a product from the cart!');
          return res.redirect('/checkout');
        }
      })
    }
  }
}