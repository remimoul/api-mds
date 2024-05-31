const UserHapiness = require('./userHapinessModel.js');

const {Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('grineasy', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const Company = sequelize.define('Company', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    userhapiness_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Userhapiness',
        key: 'id'
      }
    },
  }, {
    timestamps: true, 
    tableName: 'Company'
  });

  // Un userhapiness peut avoir plusieurs entreprises
UserHapiness.hasMany(Company, {foreignKey: 'userhapiness_id'});
Company.belongsTo(UserHapiness, {foreignKey: 'userhapiness_id'});


  (async () => {
    try {
        await Company.sync({ force: false });
        console.log("Modèle Table Company synchronisé avec la base de données.");
    } catch (error) {
        console.error("Erreur lors de la synchronisation du modèle Table: Company", error);
    }
  })();


  module.exports = Company;  