const Sequelize = require('sequelize');

const sequelize = new Sequelize('grineasy', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;