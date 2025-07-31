import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const UserVerification = sequelize.define('UserVerification', {
  verification_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  code: {
    type: DataTypes.STRING(6),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'user_id',
    },
    allowNull: false,
  },
  resendAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  failedAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'User_Verifications',
  timestamps: false,
});

UserVerification.associate = (models) => {
  UserVerification.belongsTo(models.User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });
};

export default UserVerification;
