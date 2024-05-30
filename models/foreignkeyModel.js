const Company = require('./companyModel');
const User = require('./userModel');
const UserHapiness = require('./userHapinessModel');
const Messages = require('./messagesModel');
const Conversation = require('./conversationModel');

// Une entreprise peut avoir plusieurs utilisateurs
Company.hasMany(User, {foreignKey: 'company_id', as: 'users'});
User.belongsTo(Company, {foreignKey: 'company_id', as: 'company'});

// Un utilisateur peut avoir plusieurs messages
User.hasMany(Messages, {foreignKey: 'user_id', as: 'messages'});
Messages.belongsTo(User, {foreignKey: 'user_id', as: 'user'});

// Une conversation peut avoir plusieurs messages
Conversation.hasMany(Messages, {foreignKey: 'conversation_id', as: 'messages'});
Messages.belongsTo(Conversation, {foreignKey: 'conversation_id', as: 'conversation'});

// Une conversation peut avoir un seul UserHapiness
Conversation.hasOne(UserHapiness, {foreignKey: 'conversation_id', as: 'userhapiness'});
UserHapiness.belongsTo(Conversation, {foreignKey: 'conversation_id', as: 'userhapiness'});

// Un UserHapiness peut avoir plusieurs utilisateurs
UserHapiness.hasMany(User, {foreignKey: 'userhapiness_id', as: 'company_userhapiness'});
User.belongsTo(UserHapiness, {foreignKey: 'userhapiness_id', as: 'company_userhapiness'});

// Un utilisateur peut avoir plusieurs conversations
User.hasMany(Conversation, {foreignKey: 'user_id', as: 'conversations'});
Conversation.belongsTo(User, {foreignKey: 'user_id', as: 'user'});
