import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Painting_Museum = sequelize.define(
  "Painting_Museum",
  {
    painting_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Paintings",
        key: "painting_id",
      },
      primaryKey: true,
    },
    museum_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Museums",
        key: "museum_id",
      },
      primaryKey: true,
    },
  },
  {
    tableName: "Painting_Museum",
    timestamps: false,
  }
);

export default Painting_Museum;
