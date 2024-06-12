"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Plate extends Model {
    static associate(models) {
      // Define association here
      Plate.hasMany(models.OrderItem, { foreignKey: "plate_id" });
    }
  }
  Plate.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      category: DataTypes.STRING,
      availability: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Plate",
    }
  );
  return Plate;
};
