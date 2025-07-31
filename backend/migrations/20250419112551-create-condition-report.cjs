'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ConditionReports', {
      condition_report_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
        allowNull: false,
      },
      images: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: [],
      },
      painting_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Paintings', 
          key: 'painting_id',
        },
        onDelete: 'CASCADE',
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ConditionReports');
  },
};
