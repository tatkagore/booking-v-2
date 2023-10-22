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
  },
);
const { Spot } = require("../db.js");

/* GET Spots */
router.get("/", async (req, res, next) => {
  try {
    const spots = await Spot.findAll();
    res.json(spots);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving spots." });
  }
});

/* POST Spot */
router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Spot name is required." });
    }

    const spot = await Spot.create({
      name: name,
    });

    res.json({ spot });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the spot." });
  }
});

/* PUT Spot */
router.put("/:spotId", async (req, res, next) => {
  try {
    const { spotId } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Spot name is required." });
    }

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ error: "Spot not found." });
    }

    spot.name = name;
    await spot.save();

    res.json({ message: "Spot updated." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the spot." });
  }
});

/* DELETE Spot */
router.delete("/:spotId", async (req, res, next) => {
  try {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ error: "Spot not found." });
    }

    await spot.destroy();

    res.json({ message: "Spot deleted." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the spot." });
  }
});

module.exports = router;
