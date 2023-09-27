var express = require('express');
var router = express.Router();

const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json')['development']
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
});
const { Room } = require("../db.js"); 


/* GET Room */
router.get("/", async (req, res, next) => {
    const room = await Room.findAll();
    res.json({ message: room});
});

/* Post Room */
router.post('/', async (req, res, next) => {
    const room = await Room.create({
        name: "Rooftop"
    })
    res.json({ message: room });
});

/* Put Room. */
router.put('/', async (req, res, next) => {
    const room = await Room.findByPk(1)
    room.name = "4places"
    room.save()
    res.json({ message: "Hello, put Room!" });
});


/* Delete Room */
router.delete("/", async  (req, res, next) => {
    const room = await Room.findByPk(1);
    await room.destroy();
    res.json({ message: "Hello, delete Reservation!" });
});

module.exports = router;
