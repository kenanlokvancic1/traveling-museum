import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Exhibition_Painting = sequelize.define(
  "Exhibition_Painting",
  {
    exhibition_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Exhibitions",
        key: "exhibition_id",
      },
      allowNull: false,
    },
    painting_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Paintings",
        key: "painting_id",
      },
      allowNull: false,
    },
  },
  {
    tableName: "Exhibition_Painting",
    timestamps: false,
  }
);

Exhibition_Painting.associate = (models) => {
  Exhibition_Painting.belongsTo(models.Exhibition, {
    foreignKey: "exhibition_id",
    onDelete: "CASCADE",
  });

  Exhibition_Painting.belongsTo(models.Painting, {
    foreignKey: "painting_id",
    onDelete: "CASCADE",
  });
};

export default Exhibition_Painting;
