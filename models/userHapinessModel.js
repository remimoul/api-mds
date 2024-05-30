const {Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('grineasy', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const UserHapiness = sequelize.define('UserHapiness', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
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