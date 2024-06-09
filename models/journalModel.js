const { Sequelize, DataTypes } = require('sequelize');
const User = require('./userModel');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_LOGIN, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const Journal = sequelize.define(
  'Journal',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    emotion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thoughts: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: 'journals',
  },
);

User.hasMany(Journal, { foreignKey: 'user_id' });
Journal.belongsTo(User, { foreignKey: 'user_id' });

(async () => {
  try {
    await Journal.sync({ force: false });
    console.log('Modèle Table Journal synchronisé avec la base de données.');
  } catch (error) {
    console.error('Erreur lors de la synchronisation du modèle Table: Journal', error);
  }
})();

module.exports = Journal;
