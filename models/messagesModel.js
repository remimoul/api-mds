const {Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('grineasy', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const Messages = sequelize.define('Conversation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  conversation_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  timestamps: true, 
  tableName: 'messages'
});

(async () => {
  try {
      await Messages.sync({ force: false });
      console.log("Modèle Table Messages synchronisé avec la base de données.");
  } catch (error) {
      console.error("Erreur lors de la synchronisation du modèle Table: Messages", error);
  }
})();

module.exports = Messages;