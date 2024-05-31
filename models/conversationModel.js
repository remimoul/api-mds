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

(async () => {
  try {
      await Conversation.sync({ force: false });
      console.log("Modèle Table Conversation synchronisé avec la base de données.");
  } catch (error) {
      console.error("Erreur lors de la synchronisation du modèle Table: Conversation", error);
  }
})();

module.exports = Conversation;