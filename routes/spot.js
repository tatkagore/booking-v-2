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
const { Spot } = require("../db.js");

/* GET Spot */
router.get("/", async (req, res, next) => {
    // Retrieve all spots from the database
    const spots = await Spot.findAll();
    res.json(spots);
});
/* Post Spot */
router.post("/", async (req, res, next) => {
    const spot = await Spot.create({
    name: "Rooftop"
    });
    res.json({ message: spot });
});

/* Put Spot. */
router.put('/', async (req, res, next) => {
    const spot = await Spot.findByPk(1)
    spot.name = "seaview"
    spot.save()
    res.json({ message: "Hello, put Room!" });
});

/* Delete Spot */
router.delete("/", async  (req, res, next) => {
    const spot = await Spot.findByPk(1);
    await spot.destroy();
    res.json({ message: "Hello, delete Reservation!" });
});
module.exports = router;
