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
    user_id:{
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    timestamps: true, 
    tableName: 'company'
  });

  (async () => {
    try {
        await Company.sync({ force: false });
        console.log("Modèle Table Company synchronisé avec la base de données.");
    } catch (error) {
        console.error("Erreur lors de la synchronisation du modèle Table: Company", error);
    }
  })();

  module.exports = Company;  