'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ExhibitionTracks', {
      exhibition_track_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      exhibition_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Exhibitions',
          key: 'exhibition_id',
        },
        onDelete: 'CASCADE',
      },
      step_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      departure_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      arrival_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      transport_method: {
        type: Sequelize.ENUM('truck', 'airplane', 'ship', 'train', 'van', 'other'),
        allowNull: false,
      },
      departure_location: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      arrival_location: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      geo_path: {
        type: Sequelize.JSONB,
        allowNull: true,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ExhibitionTracks');
  },
};
