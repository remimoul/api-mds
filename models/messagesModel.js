const sequelize = require('../database.js');
const {Sequelize, DataTypes } = require('sequelize');

const Messages = sequelize.define('Conversation', {
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
  conversation_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Conversations',
      key: 'id'
    }
  },
  content: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  timestamps: true, 
  tableName: 'messages'
});

module.exports = Messages;