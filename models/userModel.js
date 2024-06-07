require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_LOGIN, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(254),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    company_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['Employé', 'Entreprise', 'Happiness Officer'],
    },
  },
  {
    timestamps: true,
    tableName: 'users',
  },
);

(async () => {
  try {
    await User.sync({ force: false });
    console.log('Modèle Table Users synchronisé avec la base de données.');
  } catch (error) {
    console.error('Erreur lors de la synchronisation du modèle Table: Users', error);
  }
})();

module.exports = User;
