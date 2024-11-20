const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('superhero_db', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
}, {
  tableName: 'superheros_table' 
});

const Superhero = sequelize.define('superheros_table', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  realName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  originDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  superpowers: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  catchPhrases: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
}, {
  tableName: 'superheros_table', 
  timestamps: true, 
});

sequelize.sync({ alter: true })
  .then(() => console.log('Database synchronized'))
  .catch((error) => console.error('Error synchronizing database:', error));

module.exports = Superhero;
