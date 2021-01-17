const orderModel = require('../models/orders');
const userModel = require('../models/user');
const {validationResult} = require('express-validator');

// Gets user's orders
exports.getUserOrders = (req, res) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) {
    var user = req.session.user;
    if (user) {
      orderModel.getByUser(user, (err, result) => {
        if (err) throw err;
        if(!result) {
          res.render('checkout', {
            title: 'Profile',
            scripts: "js/profilescript.js",
            loggedIn: req.session.user,
            orders: null
          });
        }
        else {
          res.render('profile', {
            title: 'Profile',
            scripts: "js/profilescript.js",
            loggedIn: req.session.user,
            name: req.session.name,
            orders: result.products,
            total: result.total
          });
        }
      });
    }
  }
  else {
    console.log(errors);
  }
};