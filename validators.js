const { body } = require('express-validator');

/*User Registration*/
const userRegisterValidation = [
  body('regun').trim().not().isEmpty().withMessage("Username is required."),
  body('regfn').trim().not().isEmpty().withMessage("Full Name is required."),
  body('regemail').trim().not().isEmpty().withMessage("Email is required.").isEmail().withMessage("Please provide a valid email."),
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
  body('fullname').trim().not().isEmpty().withMessage("Full Name is required."),
  body('contno').isLength({ min: 11, max: 11 }).withMessage("Contact number should be 11 digits in length.").isInt().withMessage("Contact number should only be composed of numbers."),
  body('houseno').trim().not().isEmpty().withMessage("House Number is required."),
  body('brngy').trim().not().isEmpty().withMessage("Barangay is required."),
  body('city').trim().not().isEmpty().withMessage("City is required."),
  body('prov').trim().not().isEmpty().withMessage("Province is required."),
];

/*User Checkout Shipping*/
const checkoutShippingValidation = [
  body('fullname').trim().not().isEmpty().withMessage("Full Name is required."),
  body('contno').isLength({ min: 11, max: 11 }).withMessage("Contact number should be 11 digits in length.").isInt().withMessage("Contact number should only be composed of numbers."),
  body('email').trim().not().isEmpty().withMessage("Email is required.").isEmail().withMessage("Please provide a valid email."),
  body('houseno').trim().not().isEmpty().withMessage("House Number is required."),
  body('brngy').trim().not().isEmpty().withMessage("Barangay is required."),
  body('city').trim().not().isEmpty().withMessage("City is required."),
  body('prov').trim().not().isEmpty().withMessage("Province is required."),
  body('payment').not().isEmpty().withMessage("Please select a method of payment."),
];

module.exports = { userRegisterValidation, userLoginValidation, updateShippingValidation, checkoutShippingValidation };
