import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Exhibition = sequelize.define(
  "Exhibition",
  {
    exhibition_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    museum_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Museums",
        key: "museum_id",
      },
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("in warehouse", "in transport", "delivered"),
      allowNull: false,
    },
  },
  {
    tableName: "Exhibitions",
    timestamps: false,
  }
);

Exhibition.associate = (models) => {
  Exhibition.belongsTo(models.Museum, {
    foreignKey: "museum_id",
    as: "Museum",
  });

  Exhibition.hasMany(models.Review, {
    foreignKey: "exhibition_id",
    as: "Reviews",
  });

  Exhibition.belongsToMany(models.Painting, {
    through: models.Exhibition_Painting,
    foreignKey: "exhibition_id",
    otherKey: "painting_id",
    as: "Paintings",
  });

  Exhibition.hasMany(models.ExhibitionTrack, {
    foreignKey: "exhibition_id",
    as: "Tracks",
  });
};

export default Exhibition;
