const sequelize = require('../database.js');
const {Sequelize, DataTypes } = require('sequelize');

const UserHapiness = sequelize.define('Userhapiness', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    company_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Company',
            key: 'id'
        }
    },
    }, {
    timestamps: true, 
    tableName: 'userhapiness'
    });
      
      module.exports = UserHapiness;