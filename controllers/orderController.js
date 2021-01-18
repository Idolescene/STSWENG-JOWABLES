const orderModel = require('../models/orders');
const userModel = require('../models/user');
const {validationResult} = require('express-validator');

// Gets user's orders
exports.getUserOrders = (req, res) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) {
    var user = req.session.user;
    if (user) {
      userModel.getOne({username: req.session.username}, (err, user) => {
         if (err)
           console.log('There is an error when searching for a user.');
         orderModel.getAll(user, (err, result) => {
           if (err) throw err;
           if(!result) {
             res.render('profile', {
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
               name: user.username,
               date: user.datejoined,
               full: user.fullname,
               contno: user.contactnum,
               emad: user.email,
               hno: user.housenum,
               barangay: user.barangay,
               city: user.city,
               province: user.province,
               loggedIn: req.session.user,
               orders: result
             });
           }
         });
       });
    }
  }
  else {
    console.log(errors);
  }
};
