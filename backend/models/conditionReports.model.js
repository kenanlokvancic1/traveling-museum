import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ConditionReport = sequelize.define('ConditionReport', {
  condition_report_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  images: {
    type: DataTypes.JSONB, 
    allowNull: true,
    defaultValue: [],
  },
  painting_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Paintings', 
      key: 'painting_id',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'ConditionReports',
  timestamps: false, 
});

ConditionReport.associate = (models) => {
  ConditionReport.belongsTo(models.Painting, {
    foreignKey: 'painting_id',
    onDelete: 'CASCADE',
  });
};

export default ConditionReport;
