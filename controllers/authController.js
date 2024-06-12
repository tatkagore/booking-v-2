// Import required modules and models
const { User, Membership } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "secretkey23456";

// Define the AuthController class to handle authentication-related operations
class AuthController {
  constructor() {
    // Bind methods to ensure 'this' refers to the class instance when they're called
    this.postSignUp = this.postSignUp.bind(this);
    this.postSignIn = this.postSignIn.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  // Regular expression for validating email format
  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Method to handle user registration
  async postSignUp(req, res) {
    try {
      // Extract registration details from request body
      const { email, firstName, lastName, phoneNumber, password } = req.body;

      // Check if the email already exists in the database
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Validate the email format
      if (!this.emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      // Hash the password for secure storage
      const hashedPassword = await bcrypt.hash(
        password,
        await bcrypt.genSalt(10)
      );
      // Create and store the new user in the database
      const newUser = await User.create({
        isAdmin: false,
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword,
      });

      await Membership.create({
        user_id: newUser.id,
        meals_purchased: 0,
        meals_until_free: 10,
      });

      // Generate a JWT for the new user
      const payload = { email: newUser.email, id: newUser.id };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

      // Respond with the JWT
      res.json({ jwt: token, status: 201 });
    } catch (error) {
      // Handle any errors during the sign-up process
      res.status(400).json({ error: error.message });
    }
  }

  // Method to handle user login
  async postSignIn(req, res) {
    try {
      // Extract login credentials from request body
      const { email, password } = req.body;
      // Find the user by email
      const user = await User.findOne({ where: { email } });

      // Check if user exists and the password is correct
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res
          .status(400)
          .json({ message: "Incorrect username or password" });
      }

      // Generate a JWT for the logged-in user
      const payload = { email, id: user.id };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

      // Respond with the JWT
      res.json({ jwt: token, status: 201 });
    } catch (error) {
      // Handle any errors during the sign-in process
      res.status(400).json({ error: error.message });
    }
  }

  // Method to handle password reset
  async resetPassword(req, res) {
    try {
      // Extract email and new password from request body
      const { email, newPassword } = req.body;

      // Find the user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Hash the new password and update the user's password in the database
      user.password = await bcrypt.hash(newPassword, await bcrypt.genSalt(10));
      await user.save();

      // Respond with a success message
      res.json({ message: "Password successfully reset" });
    } catch (error) {
      // Handle any errors during the password reset process
      res.status(500).json({ error: "Error resetting password" });
    }
  }
}

// Export an instance of the AuthController class
module.exports = new AuthController();
