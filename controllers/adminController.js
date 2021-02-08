const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');

exports.postEditAdminEmail = (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const {adminemail} = req.body;
    var query = {$set: {email: adminemail}};
    userModel.getOne({email: adminemail}, (err, result) => {
      if (result){
        req.flash('error_msg', 'Email already in use.');
        res.redirect('/admin/profile');
      } else {
        userModel.updateOne({username: "admin"}, query, (err, result) => {
          if (err) {
            req.flash('error_msg', 'An error has occurred. Please try again.');
            res.redirect('/admin/profile');
          } else {
            req.flash('success_msg', 'Email updated successfully!');
            req.session.email = result.email;
            res.redirect('/admin/profile');
          }
        });
      }
    })
  } else {
    const messages = errors.array().map((item) => item.msg);
    req.flash('error_msg', messages.join(' '));
    res.redirect('/admin/profile');
  }
};

exports.postEditAdminPassword = (req, res) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) {
    const {adminpass} = req.body;
    const saltRounds = 10;
    bcrypt.hash(adminpass, saltRounds, (err, hashed) => {
      var newvals = { $set: {password: hashed} };
      userModel.updateOne({username: "admin"}, newvals, (err, result) => {
        if (err) {
          req.flash('error_msg', 'An error has occurred. Please try again.');
          res.redirect('/admin/profile');
        } else {
          req.flash('success_msg', 'Password updated successfully!');
          res.redirect('/admin/profile');
        }
      });
    });
  } else {
    const messages = errors.array().map((item) => item.msg);
    console.log(messages.join(' ')); //testing
    req.flash('error_msg', messages.join(' '));
    res.redirect('/profile');
  }
};

exports.logoutAdmin = (req, res) => {
  if(req.session) {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  };
};