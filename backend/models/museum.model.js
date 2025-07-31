import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Museum = sequelize.define(
  "Museum",
  {
    museum_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    contact: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    coordinates: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "Museums",
    timestamps: false,
  }
);

Museum.associate = (models) => {
  Museum.hasMany(models.Curator_Museum, {
    foreignKey: "museum_id",
    onDelete: "CASCADE",
  });

  Museum.belongsToMany(models.Painting, {
    through: "Painting_Museum",
    foreignKey: "museum_id",
    otherKey: "painting_id",
    onDelete: "CASCADE",
  });

  Museum.hasMany(models.Exhibition, {
    foreignKey: "museum_id",
    as: "Exhibitions",
  });
};

export default Museum;
