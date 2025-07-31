'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Paintings', {
      painting_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      artist_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Artists', 
          key: 'artist_id',
        },
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      medium: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      dimensions: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      image_url: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      provenance: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      shares: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Paintings');
  }
};
