const {Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('grineasy', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = require('./userModel.js');

const Conversation = sequelize.define('Conversation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  }
}, {
  timestamps: true, 
  tableName: 'conversations'
});



// // Un utilisateur peut avoir plusieurs conversations
// User.hasMany(Conversation, {foreignKey: 'user_id'});
// Conversation.belongsTo(User, {foreignKey: 'user_id'});


(async () => {
  try {
      await Conversation.sync({ force: false });
      console.log("Modèle Table Conversation synchronisé avec la base de données.");
  } catch (error) {
      console.error("Erreur lors de la synchronisation du modèle Table: Conversation", error);
  }
})();

module.exports = Conversation;