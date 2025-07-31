import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const CuratorRequest = sequelize.define(
  "CuratorRequest",
  {
    curator_request_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "user_id",
      },
      allowNull: false,
    },
    motivation: {
      type: DataTypes.TEXT,  
      allowNull: false,
    },
    cv_url: {  
      type: DataTypes.TEXT,
      allowNull: true,
    },
    additional_files: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: [],
    },
    assigned_admin_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "user_id",
      },
      allowNull: true,  
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending",
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "CuratorRequests",
    timestamps: false,
  }
);

CuratorRequest.associate = (models) => {
  CuratorRequest.belongsTo(models.User, {
    foreignKey: "user_id",
    as: "Applicant",
  });

  CuratorRequest.belongsTo(models.User, {
    foreignKey: "assigned_admin_id",
    as: "ReviewingAdmin",
  });
};

export default CuratorRequest;