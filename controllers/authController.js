const { Reservation, User } = require("../models");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "secretkey23456";


// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Post Sign Up
exports.postSignUp = async (req, res) => {
    try {
       // Check if the email already exists in the database
    const existingUser = await User.findOne({
        where: { email: req.body.email },
      });
  
      // If an existing user is found, respond with an error
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }
      // Check if the provided email matches the email regex
      if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }
  
      const { firstName, lastName, email, phoneNumber, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = {
        isAdmin: false,
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword,
      };
      await User.create(user);
  
      const payload = {
        email: user.email,
        id: user.id,
      };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
      res.json({ jwt: token, status: 201 });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
// Post Sign In
exports.postSignIn = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!user)
    return res
      .status(400)
      .json({ message: `Nom d'utilisateur ou mot de passe incorrect` });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res
      .status(400)
      .json({ message: `Nom d'utilisateur ou mot de passe incorrect` });

  const payload = {
    email: req.body.email,
    id: user.id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  res.json({ jwt: token, status: 201 });
};
  
// Post Reset Password
exports.resetPassword = async (req, res) => {
try {
  const { email, newPassword } = req.body;

  // Basic validation
  if (!email || !newPassword) {
    return res
      .status(400)
      .json({ error: "Email et nouveau mot de passe sont requis" });
  }

  // Search for the user by email
  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  console.log("Salt generated successfully");
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  console.log("Password hashed successfully");

  // Update the password in the database
  console.log("Avant la sauvegarde :", user.password);
  user.password = hashedPassword;
  await user.save();
  console.log("Après la sauvegarde :", user.password);

  // Respond with a success message
  res.json({ message: "Mot de passe réinitialisé avec succès" });
} catch (error) {
  // Handle errors that may occur during the reset process
  console.error(error);
  res
    .status(500)
    .json({ error: "Erreur lors de la réinitialisation du mot de passe" });
}
};