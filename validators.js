const { body } = require('express-validator');

/*User Registration*/
const userRegisterValidation = [
  body('regun').not().isEmpty().withMessage("Username is required."),
  body('regfn').not().isEmpty().withMessage("Full Name is required."),
  body('regemail').not().isEmpty().withMessage("Email is required.").isEmail().withMessage("Please provide a valid email."),
  body('regpass').isLength({ min: 8 }).withMessage("Password needs to be at least 8 characters long."),
  body('regcpass').isLength({ min: 8 }).withMessage("Confirm password needs to be at least 8 characters long.")
    .custom((value, { req }) => {
      if (value !== req.body.regpass) {
        throw new Error("Passwords need to match.");
      }
      return true;
    })
];

/*User Login*/
const userLoginValidation = [
  body('logemail').not().isEmpty().withMessage("Username/Email is required."),
  body('logpass').not().isEmpty().withMessage("Password is required.")
];

/*User Update Shipping Details*/
const updateShippingValidation = [
  body('fullname').not().isEmpty().withMessage("Full Name is required."),
  body('contno').isLength({ min: 11, max: 11 }).withMessage("Contact number should be 11 digits in length."),
  body('email').not().isEmpty().withMessage("Email is required.").isEmail().withMessage("Please provide a valid email."),
  body('houseno').not().isEmpty().withMessage("House Number is required."),
  body('brngy').not().isEmpty().withMessage("Barangay is required."),
  body('city').not().isEmpty().withMessage("City is required."),
  body('prov').not().isEmpty().withMessage("Province is required."),
];

module.exports = { userRegisterValidation, userLoginValidation, updateShippingValidation };
