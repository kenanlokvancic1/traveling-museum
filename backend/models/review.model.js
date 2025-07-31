import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Review = sequelize.define(
  "Review",
  {
    review_id: {
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
    exhibition_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Exhibitions",
        key: "exhibition_id",
      },
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "Reviews",
    timestamps: false,
  }
);

Review.associate = (models) => {
  Review.belongsTo(models.User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });

  Review.belongsTo(models.Exhibition, {
    foreignKey: "exhibition_id",
    as: "Exhibition",
    onDelete: "CASCADE",
  });
};

export default Review;
