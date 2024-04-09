// models/Membership.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    static associate(models) {
      Membership.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Membership.init(
    {
      user_id: DataTypes.INTEGER,
      meals_purchased: DataTypes.INTEGER,
      meals_until_free: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Membership",
    }
  );
  return Membership;
};
