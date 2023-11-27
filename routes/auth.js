const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "secretkey23456"; 


// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/signup", async (req, res, next) => {
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
    next(error);
  }
});

router.post("/signin", async (req, res) => {
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
});

module.exports = router;
