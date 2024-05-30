const sequelize = require('../database.js');
const {Sequelize, DataTypes } = require('sequelize');

const Conversation = sequelize.define('Conversation', {
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
  user_happiness_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'UserHapiness',
      key: 'id'
    }
  }
}, {
  timestamps: true, 
  tableName: 'conversations'
});


module.exports = Conversation;