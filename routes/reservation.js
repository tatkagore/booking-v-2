const express = require("express");
const router = express.Router();
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
const Reservation = require("../models/reservation")(sequelize, DataTypes);

/* GET */
router.get("/", async (req, res, next) => {
  try {
    const reservations = await Reservation.findAll();
    res.json({ reservations });
  } catch (error) {
    next(error);
  }
  //   res.json({ message: "Hello, get reservation!" });
});

/* POST */
router.post("/", async (req, res, next) => {
  try {
    const { spotId, date } = req.body;

    // Check if there is an existing reservation for the same spot and date
    const existingReservation = await Reservation.findOne({
      where: {
        spotId,
        date,
        status: 1, 
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
      spotId,
      date,
      name: 'Ms Sunshine',
      note: 'rooftop please',
      status: 1,
      userId: 2,
      roomId: 4
    });

    res.json({ reservation });
  } catch (error) {
    console.log(error); // Log the error for debugging
    res.status(500).json({ error: 'An error occurred while creating the reservation.' });

    next(error);
  }
});

// router.post('/', async (req, res, next) => {
//     const reservation = await Reservation.create({
//         date: Date.now(),
//         name: 'Ms Sunshine',
//         // numberOfGuests: 2,
//         note: 'rooftop please',
//         status: 1,
//         userId: 2,
//         spotId: 3,
//         roomId: 4
//     });
// res.json({ reservation });
// });

/* PUT */
router.put("/", async function (req, res, next) {
  const id = 1;
  const reservation = await Reservation.findByPk(id);
  reservation.note = "sunset view please";
  await reservation.save();
  res.json({ reservation });
});

/* DELETE */
router.delete("/", async function (req, res, next) {
  const id = 4;
  const reservation = await Reservation.findByPk(id);
  await reservation.destroy();
  res.json({ reservation });
});

module.exports = router;
