'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_Verifications', { 
      verification_id: { 
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING(6),
        allowNull: false
      },
      resendAttempts: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      failedAttempts: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      user_id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', 
          key: 'user_id'
        },
        onDelete: 'CASCADE'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User_Verifications');  
  }
};
