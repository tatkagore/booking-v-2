var express = require("express");
var router = express.Router();
const { isAdmin } = require("../middlewares/middlewares.js");
const userController = require("../controllers/userController");

// * GET Users only for ADMIN *
router.get("/", isAdmin, userController.getUsersAsAdmin);

/* GET One Current User */
router.get("/me", userController.getCurrentUser);

/* Post User */
router.post("/", userController.createUser);

/* PUT User */
router.put("/:userId", userController.updateUser);

/* PUT User As Admin */
router.put("/admin/:userId", isAdmin, userController.updateUserAsAdmin);

/* DELETE User */
router.delete("/:userId", userController.deleteUser);

module.exports = router;
