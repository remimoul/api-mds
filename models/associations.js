const User = require('./userModel');
const Conversation = require('./conversationModel');
const Message = require('./messagesModel');

// Un utilisateur peut avoir plusieurs conversations
User.hasMany(Conversation, { foreignKey: 'user_id' });
Conversation.belongsTo(User, { foreignKey: 'user_id' });

// Une conversation peut avoir plusieurs messages
Conversation.hasMany(Message, { foreignKey: 'conversation_id' });
Message.belongsTo(Conversation, { foreignKey: 'conversation_id' });

// Un utilisateur peut avoir plusieurs messages
User.hasMany(Message, { foreignKey: 'user_id' });
Message.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { User, Conversation };
