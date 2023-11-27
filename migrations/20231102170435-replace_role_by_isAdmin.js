"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.addColumn('Users', 'isAdmin', {
          type: Sequelize.BOOLEAN
        }, { transaction }),
        queryInterface.removeColumn('Users', 'role', { transaction }),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'isAdmin', { transaction }),
        queryInterface.addColumn('Users', 'role', {
          type: Sequelize.STRING
        }, { transaction }),
      ]);
    });
  }
};