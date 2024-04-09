var express = require("express");
var router = express.Router();
const { isAdmin } = require("../middlewares/middlewares.js");
const {
  createUser,
  getUsersAsAdmin,
  getCurrentUser,
  updateUser,
  updateUserAsAdmin,
  deleteUser,
} = require("../controllers/userController.js");

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
