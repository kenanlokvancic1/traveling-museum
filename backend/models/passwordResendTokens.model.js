import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const PasswordResetToken = sequelize.define('PasswordResetToken', {
  token_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'user_id',
    },
    onDelete: 'CASCADE',
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'PasswordResetTokens',
  timestamps: false,
});

export default PasswordResetToken;
