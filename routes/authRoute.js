const express = require("express");
const router = express.Router();
const {
  postSignUp,
  postSignIn,
  resetPassword,
} = require("../controllers/authController");
const SECRET_KEY = "secretkey23456";
const {
  signUpValidationRules,
  signInValidationRules,
} = require("../middlewares/authValidationRules");
const { validationResult } = require("express-validator");


// Route for resetting the password
router.post("/reset-password", resetPassword);

// Route for Sign Up
router.post("/signup", signUpValidationRules(), async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  postSignUp(req, res);
});

// Route for Sign In
router.post("/signin", signInValidationRules(), async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  postSignIn(req, res);
});

module.exports = router;
