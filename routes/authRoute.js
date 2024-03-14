const express = require("express");
const router = express.Router();
const {
  postSignUp,
  postSignIn,
  resetPassword,
} = require("../controllers/authController");
const SECRET_KEY = "secretkey23456";

// Route for Sign Up
router.post("/signup", postSignUp);

// Route for Sign In
router.post("/signin", postSignIn);

// Route for resetting the password
router.post("/reset-password", resetPassword);

module.exports = router;
