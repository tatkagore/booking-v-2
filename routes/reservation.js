const express = require('express');
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json')['development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
  });
const Reservation = require('../models/reservation')(
    sequelize, DataTypes
);

/* GET */
router.get('/', async (req, res, next) => {
    try {
        const reservations = await Reservation.findAll();
        res.json({ reservations });
    } catch (error) {
        next(error);
    }
//   res.json({ message: "Hello, get reservation!" });
});

/* POST */
router.post('/', async (req, res, next) => {
    const reservation = await Reservation.create({
        date: Date.now(),
        name: 'Ms Sunshine',
        // numberOfGuests: 2,
        note: 'rooftop please',
        status: 1,
        userId: 2,
        spotId: 3,
        roomId: 4
    });
  res.json({ reservation });
});

/* PUT */
router.put('/', async function (req, res, next) {
    const id = 1;
    const reservation = await Reservation.findByPk(id);
    reservation.note = 'sunset view please';
    await reservation.save();
    res.json({ reservation });
});

/* DELETE */
router.delete('/', async function(req, res, next) {
    const id = 4;
    const reservation = await Reservation.findByPk(id);
    await reservation.destroy();
    res.json({ reservation });
});

module.exports = router;