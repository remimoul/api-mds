const {Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('grineasy', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const Conversation = require('./conversationModel');

const UserHapiness = sequelize.define('Userhapiness', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    }, {
    timestamps: true, 
    tableName: 'userhapiness'
    });


    // Une conversation peut avoir un seul UserHapiness
Conversation.hasOne(UserHapiness, {foreignKey: 'conversation_id'});
UserHapiness.belongsTo(Conversation, {foreignKey: 'conversation_id'});

    (async () => {
        try {
            await UserHapiness.sync({ force: false });
            console.log("Modèle Table UserHapiness synchronisé avec la base de données.");
        } catch (error) {
            console.error("Erreur lors de la synchronisation du modèle Table: UserHapiness", error);
        }
      })();
      
      module.exports = UserHapiness;