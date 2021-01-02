const router = require('express').Router();
const userModel = require('../models/user');

const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');

var curr_user = {username: ""};

/*
  Homepage for both guest and logged in users
*/
router.get('/', (req, res) => {
  res.render('home', {
    title: "Home",
    curr_username: curr_user.username
  });
});

/*
  Catalogue page for both guest and logged in users
*/
router.get('/catalogue', (req, res) => {
  res.render('catalogue', {
    title: 'Catalogue',
    curr_username: curr_user.username
  });
  res.json({message: 'catalogue page'});
});

/*
  Login and Registration Page
*/
router.get('/login', (req, res) => {
  res.render('login', {
    title: "Login and Register",
    scripts: "js/loginscript.js",
    curr_username: curr_user.username
  });
});

/*
  Frequently Asked Questions Page
*/
router.get('/faq', (req, res) => {
  res.render('faq', {
    title: "FAQ",
    curr_username: curr_user.username,
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
    curr_username: curr_user.username,
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
    title: 'Your Cart',
    curr_username: curr_user.username
  });
});

/*
  Shipping Page
*/
router.get('/shipping', (req, res) => {
  res.render('shipping', {
    title: 'Shipping Details and Payment Options',
    curr_username: curr_user.username
  });
});

/*
  Profile Page
*/
router.get('/profile-:param', (req, res) => {
  var user = req.params.param;
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
   });;
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
router.post('/searchUserExist',(req,res) => {
  userModel.getOne({email: req.body.user.email, password: req.body.user.password}, (err, user) => {
     var result = {cont: user, ok: true};
     if (err)
       console.log('There is an error when searching for a user.');
     console.log("User: " + user);
     if (user == null)
         result.ok = false;
     else
         result.ok = true;
     console.log("Result: " + result.ok);
     res.send(result);
   });
 });

 router.post('/searchUserName',(req,res) => {
   userModel.getOne({username: req.body.user.username}, (err, user) => {
      var result = {cont: user, ok: true};
      if (err)
        console.log('There is an error when searching for a user.');
      console.log("User: " + user);
      if (user == null)
          result.ok = false;
      else
          result.ok = true;
      console.log("Result: " + result.ok);
      res.send(result);
    });
  });

  router.post('/searchUserEmail',(req,res) => {
    userModel.getOne({email: req.body.user.email}, (err, user) => {
       var result = {cont: user, ok: true};
       if (err)
         console.log('There is an error when searching for a user.');
       console.log("User: " + user);
       if (user == null)
           result.ok = false;
       else
           result.ok = true;
       console.log("Result: " + result.ok);
       res.send(result);
     });
   });

   router.post('/loginUserEmail',(req,res) => {
     userModel.getOne({email: req.body.user.email, password: req.body.user.password}, (err, user) => {
        var result = {cont: user, ok: true};
        if (err)
          console.log('There is an error when searching for a user.');
        console.log("User: " + user);
        if (user == null)
            result.ok = false;
        else
            result.ok = true;
        console.log("Result: " + result.ok);
        res.send(result);
      });
    });

    router.post('/loginUserName',(req,res) => {
      userModel.getOne({username: req.body.user.email, password: req.body.user.password}, (err, user) => {
         var result = {cont: user, ok: true};
         if (err)
           console.log('There is an error when searching for a user.');
         console.log("User: " + user);
         if (user == null)
             result.ok = false;
         else
             result.ok = true;
         console.log("Result: " + result.ok);
         res.send(result);
       });
     });

 router.post('/createNewUser',(req, res) => {
   var user = {
     fullname:  req.body.fullname,
     username:  req.body.username,
     email: req.body.email,
     password:  req.body.password,
     datejoined: req.body.datejoined,
     contactnum: "TBA",
     housenum: "TBA",
     barangay: "TBA",
     city: "TBA",
     province: "TBA"
   };
   var result;
   userModel.create(user,(err, user) => {
     if (err){
       console.log(err.errors);
       result = {success: false, message: "new user was not created"};
       res.send(result);
     }
     else {
     console.log("new user added");
     console.log(user);
     result = {success: true, message: "new user was created"};
     res.send(result);
     }
  });
});

module.exports = router;
