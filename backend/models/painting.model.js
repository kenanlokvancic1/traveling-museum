import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
const Painting = sequelize.define(
  "Painting",
  {
    painting_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    artist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Artists",
        key: "artist_id",
      },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    medium: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    dimensions: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    provenance: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    shares: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "Paintings",
    timestamps: false,
  }
);
Painting.associate = (models) => {
  Painting.belongsTo(models.Artist, {
    foreignKey: "artist_id",
    onDelete: "CASCADE",
  });
  Painting.belongsToMany(models.Museum, {
    through: "Painting_Museum",
    foreignKey: "painting_id",
    otherKey: "museum_id",
    onDelete: "CASCADE",
  });
  Painting.belongsToMany(models.User, {
    through: "Favorites",
    foreignKey: "painting_id",
    otherKey: "user_id",
    onDelete: "CASCADE",
  });
  Painting.hasMany(models.Exhibition_Painting, {
    foreignKey: "painting_id",
    onDelete: "CASCADE",
  });
  Painting.belongsToMany(models.Exhibition, {
    through: models.Exhibition_Painting,
    foreignKey: "painting_id",
    otherKey: "exhibition_id",
    as: "Exhibitions",
  });
  Painting.hasMany(models.ConditionReport, {
    foreignKey: "painting_id",
    onDelete: "CASCADE",
  });
};
export default Painting;
