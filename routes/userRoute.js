var express = require("express");
var router = express.Router();
const { Sequelize, DataTypes } = require("sequelize");
const config = require("config");
const { User } = require("../db.js");
const { isAdmin } = require("../middlewares.js");
const {
  createUser,
  getUsersAsAdmin,
  getCurrentUser,
  updateUser,
  updateUserAsAdmin,
  deleteUser,
} = require("../controllers/userController.js");
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

// * GET Users only for ADMIN *
router.get("/", isAdmin, getUsersAsAdmin);

/* GET One Current User */
router.get("/me", getCurrentUser);

/* Post User */
router.post("/", createUser);

/* PUT User */
router.put("/:userId", updateUser);

/* PUT User As Admin */
router.put("/admin/:userId", isAdmin, updateUserAsAdmin);

/* DELETE User */
router.delete("/:userId", deleteUser);

module.exports = router;
