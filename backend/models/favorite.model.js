import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Favorite = sequelize.define(
  "Favorite",
  {
    painting_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Paintings",
        key: "painting_id",
      },
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "user_id",
      },
      allowNull: false,
    },
  },
  {
    tableName: "Favorites",
    timestamps: false,
  }
);

Favorite.associate = (models) => {
  Favorite.belongsTo(models.User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });

  Favorite.belongsTo(models.Painting, {
    foreignKey: "painting_id",
    onDelete: "CASCADE",
  });
};

export default Favorite;
