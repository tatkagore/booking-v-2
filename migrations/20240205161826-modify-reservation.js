'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.addColumn('Reservations', 'numberOfGuests', {
          type: Sequelize.INTEGER
        }, { transaction }),
        queryInterface.removeColumn('Reservations', 'status', { transaction }),
        queryInterface.removeColumn('Reservations', 'roomId', { transaction }),
        queryInterface.removeColumn('Reservations', 'spotId', { transaction }),
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.removeColumn('Reservations', 'numberOfGuests', { transaction }),
        queryInterface.addColumn('Reservations', 'status', {
          type: Sequelize.INTEGER
        }, { transaction }),
        queryInterface.addColumn('Reservations', 'roomId', {
          type: Sequelize.INTEGER
        }, { transaction }),
        queryInterface.addColumn('Reservations', 'spotId', {
          type: Sequelize.INTEGER
        }, { transaction }),
      ]);
    });
  }
};
