const express = require("express");
const router = express.Router();
const { Sequelize, DataTypes } = require("sequelize");
const config = require("config");
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

const Reservation = require("../models/reservation")(sequelize, DataTypes);

/* GET All Reservations */
router.get("/", isAdmin, async (req, res, next) => {
  try {
    const reservations = await Reservation.findAll();
    res.json({ reservations });
  } catch (error) {
    next(error);
  }
});

/* GET All Reservations for current user */
router.get("/me", async (req, res, next) => {
  try {
    // Get the user ID
    const userId = req.user.id;

    const reservations = await Reservation.findAll({
      where: {
        userId: userId
      },
    });
    res.json({ reservations });
  } catch (error) {
    next(error);
  }
});

/* POST Create Reservation */
router.post("/", async (req, res, next) => {
  try {
    const { date, note, userId, numberOfGuests } = req.body;

    // Check if there is an existing reservation for the same spot and date
    const existingReservation = await Reservation.findOne({
      where: {
        date,
      },
    });

    if (existingReservation) {
      // Spot is already reserved for the specified date
      return res
        .status(400)
        .json({ error: "Spot is already reserved for this date and time." });
    }

    // If no existing reservation, create the new reservation
    const reservation = await Reservation.create({
      numberOfGuests,
      date,
      note,
      userId,
    });

    res.json({ reservation });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ error: "An error occurred while creating the reservation." });
    next(error);
  }
});

/* PUT Update Reservation */
router.put("/:id", async function (req, res, next) {
  const id = req.params.id;
  const { note } = req.body;

  try {
    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found." });
    }

    reservation.note = note;
    await reservation.save();
    res.json({ reservation });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the reservation." });
    next(error);
  }
});

/* DELETE Reservation */
router.delete("/:reservationId", (req, res, next) => {
  const reservationId = req.params.reservationId;

  Reservation.destroy({
    where: { id: reservationId },
  })
    .then((rowsDeleted) => {
      if (rowsDeleted === 0) {
        return res.status(404).json({ message: "Reservation not found." });
      }
      res.status(200).json({ message: "Reservation deleted." });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the reservation." });
    });
});

module.exports = router;
