const router = require('express').Router();
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const {userRegisterValidation, userLoginValidation} = require('../validators.js');

/*
  Homepage for both guest and logged in users
*/
router.get('/', (req, res) => {
  res.render('home', {
    title: "Home"
  });
});

/*
  Catalogue page for both guest and logged in users
*/
router.get('/catalogue', (req, res) => {
  res.render('catalogue', {
    title: 'Catalogue'
  });
  res.json({message: 'catalogue page'});
});

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
  res.render('faq', {
    title: "FAQ",
    question: "What is this question?",
    answer: "Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer. Answer."
  });
});

/*
  Contact Us Page
*/
router.get('/contact', (req, res) => {
  res.render('contact', {
    title: "Contact Us",
    fblink: "www.facebook.com/SalawalCo",
    iglink: "www.instagram.com/SalawalCo",
    phonenum: "+ 63 961 801 4235",
    email: "salawalco.ph@gmail.com"
  });
});

/*
  Checkout Page
*/
router.get('/checkout', (req, res) => {
  res.render('checkout', {
    title: 'Your Cart'
  });
});

/*
  Shipping Page
*/
router.get('/shipping', (req, res) => {
  res.render('shipping', {
    title: 'Shipping Details and Payment Options'
  });
});

/*
  Profile Page
*/
router.get('/profile', (req, res) => {
  var user = req.session.username;

  userModel.getOne({username: user}, (err, user) => {
     if (err)
       console.log('There is an error when searching for a user.');

     res.render('profile', {
       title: 'Profile',
       name: user.username,
       date: user.datejoined,
       full: user.fullname,
       contno: user.contactnum,
       emad: user.email,
       hno: user.housenum,
       barangay: user.barangay,
       city: user.city,
       province: user.province
     });
   });
});
/*
  About Us Page
*/
router.get('/about', (req,res) => {
  res.render('about', {
    title: 'About Us',
    story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in fermentum orci. Aenean blandit massa tincidunt est interdum tempor. Sed ut consequat quam.',
    about: 'De kalidad na mga salawal na gawang Bulacan.'
  })
})

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
        res.redirect('/login');
      } else {
        userModel.getOne({username: regun}, (err, result) => {
          if(result) {
            console.log(result); //testing
            console.log('User already exists.') //testing
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
                  res.redirect('/login');
                } else {
                  console.log(user); //testing
                  console.log("Registration successful."); //testing
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
              res.redirect('/login');
            }
          });
        } else {
          //search user via username
          userModel.getOne({username: logemail}, (err, user2) => {
            if(err) {
              console.log(err); //testing
              console.log('An error has occurred while searching for a user.') //testing
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
                    res.redirect('/login');
                  }
                });
              } else {
                console.log('User not found. Please try again.'); //testing
                res.redirect('/login');
              }
            }
          });
        }
      }
    });
  } else {
    const messages = errors.array().map((item) => item.msg);
    console.log(messages.join(' ')); //testing
    res.redirect('/login');
  }
});

module.exports = router;
