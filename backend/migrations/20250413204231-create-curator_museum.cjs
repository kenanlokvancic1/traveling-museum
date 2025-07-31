'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Curator_Museum', {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'user_id',
        },
        onDelete: 'CASCADE',
      },
      museum_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Museums',
          key: 'museum_id',
        },
        onDelete: 'CASCADE',
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Curator_Museum');
  }
};
