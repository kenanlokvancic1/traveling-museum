'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.changeColumn('Paintings', 'image_url', {
        type: Sequelize.STRING(255),
        allowNull: true,
      }),
      queryInterface.changeColumn('Paintings', 'description', {
        type: Sequelize.TEXT,
        allowNull: true,
      }),
      queryInterface.changeColumn('Paintings', 'location', {
        type: Sequelize.STRING(255),
        allowNull: true,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.changeColumn('Paintings', 'image_url', {
        type: Sequelize.STRING(100),
        allowNull: true,
      }),
      queryInterface.changeColumn('Paintings', 'description', {
        type: Sequelize.STRING(255),
        allowNull: true,
      }),
      queryInterface.changeColumn('Paintings', 'location', {
        type: Sequelize.STRING(50),
        allowNull: true,
      }),
    ]);
  }
};
