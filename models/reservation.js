"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reservation.belongsTo(models.User, {
        foreignKey: "userId",
        unique: true,
      });
    }
  }
  Reservation.init(
    {
      date: DataTypes.DATE,
      note: DataTypes.STRING,
      numberOfGuests: DataTypes.INTEGER,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: sequelize.models.User,
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Reservation",
    }
  );
  return Reservation;
};
