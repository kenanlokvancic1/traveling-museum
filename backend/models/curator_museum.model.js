import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Curator_Museum = sequelize.define(
  "Curator_Museum",
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "user_id",
      },
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
  },
  {
    tableName: "Curator_Museum",
    timestamps: false,
    hooks: {
      async beforeCreate(curatorMuseum) {
        const user = await sequelize.models.User.findByPk(
          curatorMuseum.user_id
        );
        if (user && user.role !== "curator") {
          throw new Error(
            "User must be a curator to be associated with a museum"
          );
        }
      },
    },
  }
);

Curator_Museum.associate = (models) => {
  Curator_Museum.belongsTo(models.User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });

  Curator_Museum.belongsTo(models.Museum, {
    foreignKey: "museum_id",
    onDelete: "CASCADE",
  });
};

export default Curator_Museum;
