"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CuratorRequests", {
      curator_request_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "user_id",
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
      motivation: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      cv_url: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      additional_files: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: [],
      },
      assigned_admin_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "user_id",
        },
        allowNull: true,
        onDelete: "SET NULL",
      },
      status: {
        type: Sequelize.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("CuratorRequests");
    await queryInterface.sequelize.query(
      "DROP TYPE IF EXISTS enum_CuratorRequests_status;"
    );
  },
};
