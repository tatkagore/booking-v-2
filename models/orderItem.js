"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      // Associations can be defined here
      OrderItem.belongsTo(models.Order, { foreignKey: "order_id" });
      OrderItem.belongsTo(models.Plate, { foreignKey: "plate_id" });
    }
  }

  OrderItem.init({
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders', // Name of the created table
        key: 'id'
      }
    },
    plate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Plates', // Name of the created table
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'OrderItem',
  });

  return OrderItem;
};
