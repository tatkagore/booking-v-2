var express = require("express");
var router = express.Router();
const { Sequelize, DataTypes } = require("sequelize");
const config = require("config");
const { User } = require("../db.js");
const { isAdmin } = require("../middlewares.js");
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  },
);

// *** GET Users only for ADMIN ***
router.get("/", isAdmin, async (req, res, next) => {
  try {
    // Retrieve all users from the database
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    // Handle any errors that occur while retrieving users
    next(error);
  }
});

/* GET Users */
// router.get("/", async (req, res, next) => {
//   // Retrieve all users from the database
//   const users = await User.findAll();
//   res.json(users);
// });

/* GET One User */
router.get("/me", async (req, res, next) => {
  try {
    // Get the user ID
    const userId = req.user.id;

    // Find the user by ID
    const currentUser = await User.findByPk(userId);

    // If the user is not found, send a 404 error
    if (!currentUser) {
      return res.status(404).json({ error: "user not found" });
    }

    // Return the user information
    res.status(200).json({ currentUser });
  } catch (error) {
    // If there is an error, send the error message to the client
    next(error);
  }
});


/* Post User */
router.post("/", async (req, res, next) => {
  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });

    // If an existing user is found, respond with an error
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

   // Create a new user with data from the request body
   const user = await User.create(req.body);

    res.json({ message: user });
  } catch (error) {
    // Handle any errors that occur during user creation
    next(error);
  }
});

/* PUT User */
router.put("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId; // Get the user ID from the URL
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user data with the information provided in the request body
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.phoneNumber = req.body.phoneNumber;
    user.password = req.body.password;

    await user.save();

    res.json({ message: "User updated", user });
  } catch (error) {
    // Handle any errors that occur during the update
    next(error);
  }
});

/* DELETE User */
router.delete("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId; // Get the user ID from the URL
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();

    res.json({ message: "User deleted" });
  } catch (error) {
    // Handle any errors that occur during the delete
    next(error);
  }
});

module.exports = router;
