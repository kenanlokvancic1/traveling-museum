import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ExhibitionTrack = sequelize.define(
  "ExhibitionTrack",
  {
    exhibition_track_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    exhibition_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Exhibitions",
        key: "exhibition_id",
      },
      allowNull: false,
    },
    step_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    departure_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    arrival_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    transport_method: {
      type: DataTypes.ENUM(
        "truck",
        "airplane",
        "ship",
        "train",
        "van",
        "other"
      ),
      allowNull: false,
    },
    departure_location: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    arrival_location: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    geo_path: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    tableName: "ExhibitionTracks",
    timestamps: false,
  }
);

ExhibitionTrack.associate = (models) => {
  ExhibitionTrack.belongsTo(models.Exhibition, {
    foreignKey: "exhibition_id",
    as: "Exhibition",
    onDelete: "CASCADE",
  });
};

export default ExhibitionTrack;
