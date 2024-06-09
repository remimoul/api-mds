const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const User = require('./userModel');
const Conversation = require('./conversationModel');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_LOGIN, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const Message = sequelize.define(
  'Message',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: 'messages',
  },
);

Message.belongsTo(User, { foreignKey: 'user_id' });
// avec onDelete: 'CASCADE', si une conversation est supprimé, tous les messages associés seront également supprimés
Message.belongsTo(Conversation, { foreignKey: 'conversation_id', onDelete: 'CASCADE' });

(async () => {
  try {
    await Message.sync({ force: false });
    console.log('Modèle Table Message synchronisé avec la base de données.');
  } catch (error) {
    console.error('Erreur lors de la synchronisation du modèle Table: message', error);
  }
})();

module.exports = Message;
