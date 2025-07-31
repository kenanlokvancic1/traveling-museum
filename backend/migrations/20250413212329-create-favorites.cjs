'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Favorites', {
      painting_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Paintings',
          key: 'painting_id',
        },
        allowNull: false,
        onDelete: 'CASCADE',  
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'user_id',
        },
        allowNull: false,
        onDelete: 'CASCADE', 
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Favorites');
  }
};
