const { Sequelize, DataTypes } = require('sequelize');
const Conversation = require('./conversationModel');
const sequelize = new Sequelize('grineasy', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(254),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    company_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM,
      values: ['Employé', 'Entreprise','Hapiness Officer'],
    }
  }, {
    timestamps: true, 
    tableName: 'users',
  });


// Un utilisateur peut avoir plusieurs conversations
User.hasMany(Conversation, {foreignKey: 'user_id'});
Conversation.belongsTo(User, {foreignKey: 'user_id'});

  (async () => {
    try {
      await User.sync({ force: false });
      console.log("Modèle Table Users synchronisé avec la base de données.");

    } catch (error) {
        console.error("Erreur lors de la synchronisation du modèle Table: Users", error);
    }
  })();

  module.exports = User;  