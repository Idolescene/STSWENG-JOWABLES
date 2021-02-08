const { body } = require('express-validator');

/*User Registration*/
const userRegisterValidation = [
  body('regun').trim().not().isEmpty().withMessage("Username is required."),
  body('regfn').trim().not().isEmpty().withMessage("Full Name is required.").matches(/^[A-Za-z. ]+$/i).withMessage("Name should only contain letters, periods and spaces."),
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
  body('fullname').trim().not().isEmpty().withMessage("Full Name is required.").matches(/^[A-Za-z. ]+$/i).withMessage("Name should only contain letters, periods and spaces."),
  body('contno').isLength({ min: 11, max: 11 }).withMessage("Contact number should be 11 digits in length.").isInt().withMessage("Contact number should only be composed of numbers."),
  body('houseno').trim().not().isEmpty().withMessage("House Number is required.").matches(/^[0-9A-Za-z.' -]+$/i).withMessage("House number should only contain letters, numbers, periods, dashes, apostrophes and spaces.").not().matches(/^NONE$/i).withMessage("House Number should not be NONE."),
  body('brngy').trim().not().isEmpty().withMessage("Barangay is required.").matches(/^[0-9A-Za-z ]+$/i).withMessage("Barangay should only contain letters, numbers and spaces.").not().matches(/^NONE$/i).withMessage("Barangay should not be NONE."),
  body('city').trim().not().isEmpty().withMessage("City is required.").matches(/^[A-Za-z. -]+$/i).withMessage("City should only contain letters, periods, dashes and spaces.").not().matches(/^NONE$/i).withMessage("City should not be NONE."),
  body('prov').trim().not().isEmpty().withMessage("Province is required.").matches(/^[A-Za-z ]+$/i).withMessage("Province should only contain letters and spaces.").not().matches(/^NONE$/i).withMessage("Province should not be NONE."),
];

/*User Checkout Shipping*/
const checkoutShippingValidation = [
  body('fullname').trim().not().isEmpty().withMessage("Full Name is required.").matches(/^[A-Za-z. ]+$/i).withMessage("Name should only contain letters, periods and spaces."),
  body('contno').isLength({ min: 11, max: 11 }).withMessage("Contact number should be 11 digits in length.").isInt().withMessage("Contact number should only be composed of numbers."),
  body('email').trim().not().isEmpty().withMessage("Email is required.").isEmail().withMessage("Please provide a valid email."),
  body('houseno').trim().not().isEmpty().withMessage("House Number is required.").matches(/^[0-9A-Za-z.' -]+$/i).withMessage("House number should only contain letters, numbers, periods, dashes, apostrophes and spaces.").not().matches(/^NONE$/i).withMessage("House Number should not be NONE."),
  body('brngy').trim().not().isEmpty().withMessage("Barangay is required.").matches(/^[0-9A-Za-z ]+$/i).withMessage("Barangay should only contain letters, numbers and spaces.").not().matches(/^NONE$/i).withMessage("Barangay should not be NONE."),
  body('city').trim().not().isEmpty().withMessage("City is required.").matches(/^[A-Za-z. -]+$/i).withMessage("City should only contain letters, periods, dashes and spaces.").not().matches(/^NONE$/i).withMessage("City should not be NONE."),
  body('prov').trim().not().isEmpty().withMessage("Province is required.").matches(/^[A-Za-z ]+$/i).withMessage("Province should only contain letters and spaces.").not().matches(/^NONE$/i).withMessage("Province should not be NONE."),
  body('payment').not().isEmpty().withMessage("Please select a method of payment."),
];

/*User Update Password*/
const updatePasswordValidation = [
  body('editpassword').isLength({ min: 8 }).withMessage("Password needs to be at least 8 characters long."),
  body('cpassword').isLength({ min: 8 }).withMessage("Confirm password needs to be at least 8 characters long.")
    .custom((value, { req }) => {
      if (value !== req.body.editpassword) {
        throw new Error("Passwords need to match.");
      }
      return true;
    })
];

/*User Update Email*/
const updateEmailValidation = [
  body('editemail').trim().not().isEmpty().withMessage("Email is required.").isEmail().withMessage("Please provide a valid email.")
];

/*Admin Update Email*/
const adminEmailValidation = [
  body('adminemail').trim().not().isEmpty().withMessage("Email is required.").isEmail().withMessage("Please provide a valid email.")
];

/*Admin Update Password*/
const adminPasswordValidation = [
  body('adminpass').isLength({ min: 8 }).withMessage("Password needs to be at least 8 characters long.")
];

module.exports = { userRegisterValidation, userLoginValidation, updateShippingValidation, checkoutShippingValidation, updateEmailValidation, updatePasswordValidation, adminPasswordValidation, adminEmailValidation };
