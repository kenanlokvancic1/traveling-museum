import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';  


const Artist = sequelize.define('Artist', {
  artist_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100), 
    allowNull: false, 
  },
  birth_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  death_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nationality: {
    type: DataTypes.STRING(50),  
    allowNull: true,
  },
  biography: {
    type: DataTypes.STRING(1200),  
    allowNull: true,
  },
  image_url: {  
    type: DataTypes.STRING(255), 
    allowNull: true,  
  },
}, {
  tableName: 'Artists',
  timestamps: false, 
});

Artist.associate = (models) => {
  Artist.hasMany(models.Painting, {
    foreignKey: 'artist_id',
    onDelete: 'CASCADE',
  });
};

export default Artist;
