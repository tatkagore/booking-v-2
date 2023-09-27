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
const { Reservation } = require("../db.js");

/* GET Reservation */
router.get("/", async (req, res, next) => {
    const reservation = await Reservation.findAll();
    res.json({ message: reservation });
});

/* Post Reservation */
router.post("/", async (req, res, next) => {
const reservation = await Reservation.create({
    date: Date.now(),
    name: "Tanya",
    note: "Good",
    status: 1,
    userId: 1,
    spotId: 1,
    roomId: 1,
});

    res.json({ message: reservation });
});

/* Put Reservation. */
router.put("/", async (req, res, next) => {
  const reservation = await Reservation.findByPk(1);
  reservation.note = "sunset";
  reservation.save();
  res.json({ message: "Hello, put Reservation!" });
});

/* Delete Reservation */
router.delete("/", async  (req, res, next) => {
    const reservation = await Reservation.findByPk(3);
    await reservation.destroy();
    res.json({ message: "Hello, delete Reservation!" });
});

module.exports = router;
