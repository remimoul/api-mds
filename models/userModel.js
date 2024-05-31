const sequelize = require('../database.js');

const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');


const Users = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    company_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Company',
        key: 'id'
      }
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(254),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM,
      values: ['Employé', 'Entreprise','Hapiness Officer'],
    }
  }, {
    timestamps: true, 
    tableName: 'Users',
  });

  (async () => {
    try {
        await Users.sync({ force: false });
        console.log("Modèle Table Users synchronisé avec la base de données.");
    } catch (error) {
        console.error("Erreur lors de la synchronisation du modèle Table: Users", error);
    }
  })();

  module.exports = Users;  