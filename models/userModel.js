const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('grineasy2', 'root', '', {
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
    role: {
      type: DataTypes.ENUM,
      values: ['Employé', 'Entreprise','Hapiness Officer'],
    }
  }, {
    timestamps: true, 
    tableName: 'users',
  });

const Company = require('./companyModel');
const UserHapiness = require('./userHapinessModel');
const Conversation = require('./conversationModel');

  // Une entreprise peut avoir plusieurs utilisateurs
Company.hasMany(User, {foreignKey: 'company_id'});
User.belongsTo(Company, {foreignKey: 'company_id'});


// // Un UserHapiness peut avoir plusieurs utilisateurs
UserHapiness.hasMany(User, {foreignKey: 'userhapiness_id'});
User.belongsTo(UserHapiness, {foreignKey: 'userhapiness_id'});


User.hasMany(Conversation, {foreignKey: 'user_id'});
Conversation.belongsTo(User, {foreignKey: 'user_id'});

  (async () => {
    try {
      await UserHapiness.sync({ force: false });
      console.log("Modèle Table UserHapiness synchronisé avec la base de données.");

      await Company.sync({ force: false });
      console.log("Modèle Table Company synchronisé avec la base de données.");

      await User.sync({ force: false });
      console.log("Modèle Table Users synchronisé avec la base de données.");

    } catch (error) {
        console.error("Erreur lors de la synchronisation du modèle Table: Users", error);
    }
  })();

  module.exports = User;  