'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Notifications', 'details', {
      type: Sequelize.STRING(2000),
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Notifications', 'details', {
      type: Sequelize.STRING(255),
      allowNull: true
    });
  }
};