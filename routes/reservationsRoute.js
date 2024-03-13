const express = require("express");
const router = express.Router();
const { Sequelize, DataTypes } = require("sequelize");
const config = require("config");
const { isAdmin } = require("../middlewares.js");
const {
  getReservationsAsAdmin,
  getReservationsForMe,
  createReservation,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservationController.js");
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

const Reservation = require("../models/reservation.js")(sequelize, DataTypes);

/* GET All Reservations */
router.get("/", isAdmin, getReservationsAsAdmin);

/* GET All Reservations for current user */
router.get("/me", getReservationsForMe);

/* POST Create Reservation */
router.post("/", createReservation);

/* PUT Update Reservation */
router.put("/:id", updateReservation);

/* DELETE Reservation */
router.delete("/:reservationId", deleteReservation);

module.exports = router;
