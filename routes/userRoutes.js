const router = require('express').Router();
const userModel = require('../models/user');

const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');

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
    scripts: "js/loginscript.js"
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
  res.render('profile', {
    title: 'Profile',
    name: 'Your Baby',
    date: '11/11/2011',
    full: 'Mamma Mia',
    contno: '09777777777',
    emad: 'email@address',
    hno: '1',
    barangay: 'brng',
    city: 'city',
    province: 'province'
  })
})
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

// router.post('/searchUserExist',(req,res) => {
//   userModel.findOne({email: req.body.user.email, password: req.body.user.password}, (err, user) => {
//     var result = {cont: user, ok: true};
//     if (err)
//       console.log('There is an error when searching for a user.');
//     console.log("User: " + user);
//     if (user == null)
//         result.ok = false;
//     else
//         result.ok = true;
//     console.log("Result: " + result.ok);
//     res.send(result);
//   });
// });

// router.post('/createNewUser',(req, res) => {
//       var user = new userModel({
//           fullname:  req.body.fullname,
//           username:  req.body.username,
//           email: req.body.email,
//           password:  req.body.password,

//       });
//       var result;
//       user.save((err, user) => {
//           if (err){
//               console.log(err.errors);
//               result = {success: false, message: "new user was not created"};
//               res.send(result);
//           }
//           else {
//               console.log("new user added");
//               console.log(user);
//               result = {success: true, message: "new user was created"};
//               res.send(result);
//           }
//       });
// });

// temp register new user post method
router.post('/new_user_registration', (req, res) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) {
    const {fullname, username, email, password} = req.body;
    console.log(req.body.name); //testing
    userModel.getOne({email: email}, (err, result) => {
      if(result) {
        console.log(result); //testing
        console.log('User already exists.') //testing
        res.redirect('/login');
      }
      else {
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, (err, hashed) => {
          const newUser = {
            fullname: fullname,
            username: username,
            email: email,
            password: hashed
          };
          userModel.create(newUser, (err, user) => {
            if(err) {
              console.log('Error creating new account.'); //testing
              res.redirect('/login');
            }
            else {
              console.log(user); //testing
              req.session.user = user._id;
              req.session.name = user.fullname;
              res.redirect('/');
            }
          });
        });
      }
    });
  }
  else {
    console.log('Error registering.'); //testing
    res.redirect('/login');
  }
});

module.exports = router;
