// const {Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('grineasy', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql'
// });


// const Message = sequelize.define('Message', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     allowNull: false
//   },
//   content: {
//     type: DataTypes.STRING(255),
//     allowNull: false
//   }
// }, {
//   timestamps: true, 
//   tableName: 'messages'
// });

// const Conversation = require('./conversationModel');
// const User = require('./userModel');
// // Une conversation peut avoir plusieurs messages
// Conversation.hasMany(Message, {foreignKey: 'conversation_id'});
// Message.belongsTo(Conversation, {foreignKey: 'conversation_id'});

// // Un utilisateur peut avoir plusieurs messages
// User.hasMany(Message, {foreignKey: 'user_id'});
// Message.belongsTo(User, {foreignKey: 'user_id'});

// (async () => {
//   try {
//       await Message.sync({ force: false });
//       console.log("Modèle Table Message synchronisé avec la base de données.");
//   } catch (error) {
//       console.error("Erreur lors de la synchronisation du modèle Table: message", error);
//   }
// })();

// module.exports = Message;