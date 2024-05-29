const express = require('express');
const app = express();
const port = process.env.PORT || 3005;
const cors = require('cors');
const Sequelize = require('sequelize');
require('dotenv').config();



const sequelize = new Sequelize('grineasy', 'postgres', 'remi', {
    host: 'localhost',
    dialect: 'postgres'
  });

module.exports = sequelize;
  sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(error => console.error('Unable to connect to the database:', error));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const userRoute = require('./routes/userRoute');
app.use('/user', userRoute);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});