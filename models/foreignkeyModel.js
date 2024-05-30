const Company = require('./companyModel');
const User = require('./userModel');
const UserHapiness = require('./userHapinessModel');
const Messages = require('./messagesModel');
const Conversation = require('./conversationModel');

User.hasMany(Company, {foreignKey: 'user_id',as: 'companies'});
Company.belongsTo(User, {foreignKey: 'user_id', as : 'user'});

Messages.hasMany(User, {foreignKey: 'message_id', as: 'messages'});
User.belongsTo(Messages, {foreignKey: 'message_id', as: 'user'});

// UserHapiness.hasMany(User, {foreignKey: 'user_id', as: 'userhapiness'});
// User.belongsTo(UserHapiness, {foreignKey: 'user_id', as: 'user'});

// Conversation.hasMany(Messages, {foreignKey: 'conversation_id', as: 'conversation'});
// Messages.belongsTo(Conversation, {foreignKey: 'conversation_id', as: 'messages'});