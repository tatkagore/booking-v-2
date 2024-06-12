const { Plate } = require("../models");

exports.createPlate = async (req, res) => {
  try {
    const plate = await Plate.create(req.body);
    res.status(201).json(plate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPlates = async (req, res) => {
  try {
    const plates = await Plate.findAll();
    res.json(plates);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
