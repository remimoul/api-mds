const {Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('grineasy', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const Conversation = sequelize.define('Conversation', {
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
  user_happiness_id: {
    type: DataTypes.INTEGER,
    allowNull: false
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