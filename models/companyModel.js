const sequelize = require('../database.js');
const {Sequelize, DataTypes } = require('sequelize');


const Company = sequelize.define('Company', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    userhapiness_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Userhapiness',
        key: 'id'
      }
    },
  }, {
    timestamps: true, 
    tableName: 'Company'
  });


  module.exports = Company;  