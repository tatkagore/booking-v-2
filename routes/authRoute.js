const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const { signUpValidationRules, signInValidationRules } = require("../middlewares/authValidationRules");
const { validationResult } = require("express-validator");

// Route to handle password reset requests
router.post("/reset-password", AuthController.resetPassword);

// Route to handle user registration with validation middleware
router.post("/signup", signUpValidationRules(), async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If errors are found, return validation error details
    return res.status(422).json({ errors: errors.array() });
  }
  // Call the sign-up method on successful validation
  AuthController.postSignUp(req, res);
});

// Route to handle user login with validation middleware
router.post("/signin", signInValidationRules(), async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If errors are found, return validation error details
    return res.status(422).json({ errors: errors.array() });
  }
  // Call the sign-in method on successful validation
  AuthController.postSignIn(req, res);
});

// Export the router
module.exports = router;
