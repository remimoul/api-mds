const { Sequelize, DataTypes, Model } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_LOGIN, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

class Conversation extends Model {}

Conversation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: 'conversations',
  },
);

(async () => {
  try {
    await Conversation.sync({ force: false });
    console.log('Modèle Table Conversation synchronisé avec la base de données.');
  } catch (error) {
    console.error('Erreur lors de la synchronisation du modèle Table: Conversation', error);
  }
})();

module.exports = Conversation;
