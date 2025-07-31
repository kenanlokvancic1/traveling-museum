import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Notification = sequelize.define(
  "Notification",
  {
    notification_id: {
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
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    details: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },    
  },
  {
    tableName: "Notifications",
    timestamps: false,
  }
);

Notification.associate = (models) => {
  Notification.belongsTo(models.User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });
};

export default Notification;
