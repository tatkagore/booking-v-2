var express = require("express");
var router = express.Router();
const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.json")["development"];
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
    host: config.host,
    dialect: config.dialect,
    }
);
const { User } = require("../db.js");

/* GET User */
router.get("/", async (req, res, next) => {
    // Retrieve all users from the database
    const users = await User.findAll();
    res.json(users);
});

/* GET currentuser */
router.get('/currentUser', async (req, res, next) => {
    try {
    // Get the user ID 
    const userId = req.user.id;

    // Find the user by ID
    const currentUser = await User.findByPk(userId);

    // If the user is not found, send a 404 error
    if (!currentUser) {
        return res.status(404).json({ error: 'user not found' });
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
    const user = await User.create({
    role: "Guest",
    firstName: "Tanya",
    lastName: "Simmer",
    email: "tanya@gmail.com",
    phoneNumber: "555-555",
    password: "password",
});
    res.json({ message: user});
});

/* Put User. */
router.put('/', async (req, res, next) => {
    const user = await User.findByPk(1);
    user.firstName = "Thomas"
    user.save()
    res.json({ message: "Hello, put Room!" });
});


/* Delete User */

router.delete("/", async  (req, res, next) => {
    const user = await User.findByPk(1);
    await user.destroy();
    res.json({ message: "Hello, delete Reservation!" });
});

module.exports = router;
