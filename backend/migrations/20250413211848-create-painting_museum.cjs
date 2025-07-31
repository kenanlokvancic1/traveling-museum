'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Painting_Museum', {
      painting_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Paintings', 
          key: 'painting_id',
        },
        onDelete: 'CASCADE',
      },
      museum_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Museums',
          key: 'museum_id',
        },
        onDelete: 'CASCADE', 
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Painting_Museum');
  }
};
