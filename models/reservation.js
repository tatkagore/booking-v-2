"use strict";
const { Model, DataTypes } = require("sequelize");

// Define the Reservation model class extending Sequelize's Model class
module.exports = (sequelize) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * Here we define association to the User model.
     */
    static associate(models) {
      // Define a belongsTo association with the User model
      // This will add a foreignKey 'userId' to the Reservation model linking it to the User model
      Reservation.belongsTo(models.User, {
        foreignKey: "userId",
        unique: true, // Ensures a one-to-one relation, consider removing if one user can have many reservations
      });
    }
  }

  // Initialize the model definition
  Reservation.init(
    {
      // Define model attributes (columns)
      date: DataTypes.DATE, // The reservation date and time
      note: DataTypes.STRING, // Optional notes for the reservation
      numberOfGuests: DataTypes.INTEGER, // Number of guests for the reservation
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false, // This field is required
        references: {
          model: sequelize.models.User, // Defines a reference to the User model
          key: "id", // Indicates that 'userId' refers to 'id' in the User model
        },
      },
    },
    {
      sequelize, // Pass the sequelize instance
      modelName: "Reservation", // Define the name of the model
    }
  );

  // Return the class, now fully defined and associated
  return Reservation;
};
