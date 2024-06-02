const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_LOGIN, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const User = require('./userModel');
const Conversation = require('./conversationModel');
const Message = require('./messagesModel');

const UserConversation = sequelize.define(
  'UserConversation',
  {},
  {
    timestamps: true,
    tableName: 'userconversations',
  },
);

User.belongsToMany(Conversation, { through: UserConversation, foreignKey: 'user_id' });
Conversation.belongsToMany(User, { through: UserConversation, foreignKey: 'conversation_id' });
Message.belongsTo(User);
Message.belongsTo(Conversation);

(async () => {
  try {
    await UserConversation.sync({ force: false });
    console.log('Modèle Table UserConversation synchronisé avec la base de données.');
  } catch (error) {
    console.error('Erreur lors de la synchronisation du modèle Table: UserConversation', error);
  }
})();

module.exports = User;
