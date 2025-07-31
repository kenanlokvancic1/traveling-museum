import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../config/database.js";

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "curator", "user"),
      defaultValue: "user",
    },
    mobile_number: {
      type: DataTypes.STRING(25),
    },
    address: {
      type: DataTypes.STRING(50),
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "Users",
    timestamps: false,
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

User.associate = (models) => {
  User.hasOne(models.Curator_Museum, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });

  User.belongsToMany(models.Painting, {
    through: "Favorite",
    foreignKey: "user_id",
    otherKey: "painting_id",
    onDelete: "CASCADE",
  });

  User.hasMany(models.Notification, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });

  User.hasMany(models.Review, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });

  User.hasOne(models.UserVerification, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });

  User.hasMany(models.CuratorRequest, {
    foreignKey: 'user_id',
    as: 'CuratorRequests'
  });

  User.hasMany(models.CuratorRequest, {
    foreignKey: 'assigned_admin_id',
    as: 'AssignedRequests'
  });
};

export default User;
