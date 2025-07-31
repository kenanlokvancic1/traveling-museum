'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Artists', {
      artist_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      birth_year: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      death_year: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      nationality: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      biography: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Artists');
  }
};
