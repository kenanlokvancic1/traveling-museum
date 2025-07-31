'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Exhibition_Painting', {
      exhibition_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Exhibitions',
          key: 'exhibition_id',
        },
        onDelete: 'CASCADE',
      },
      painting_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Paintings',
          key: 'painting_id',
        },
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Exhibition_Painting');
  }
};
