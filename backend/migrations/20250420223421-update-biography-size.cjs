'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Artists', 'biography', {
      type: Sequelize.STRING(1200),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Artists', 'biography', {
      type: Sequelize.STRING(500),
      allowNull: true,
    });
  }
};
