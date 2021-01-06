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
  body('logpass').not().isEmpty().withMessage("Password is required."),
];

module.exports = { userRegisterValidation, userLoginValidation };
