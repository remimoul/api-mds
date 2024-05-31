const sequelize = require('../database.js');
const {Sequelize, DataTypes } = require('sequelize');

const UserHapiness = sequelize.define('Userhapiness', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    company_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Company',
            key: 'id'
        }
    },
    }, {
    timestamps: true, 
    tableName: 'userhapiness'
    });

    (async () => {
        try {
            await UserHapiness.sync({ force: false });
            console.log("Modèle Table UserHapiness synchronisé avec la base de données.");
        } catch (error) {
            console.error("Erreur lors de la synchronisation du modèle Table: UserHapiness", error);
        }
      })();
      
      module.exports = UserHapiness;