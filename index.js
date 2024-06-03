const express = require('express');
const app = express();
const port = process.env.PORT || 3005;
const cors = require('cors');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_LOGIN, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

// Importez les modèles
require('./models/userModel');
require('./models/conversationModel');
require('./models/messagesModel');
// require('./models/associations');
require('./models/userConversationModel');

sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const userRoute = require('./routes/userRoute');
app.use('/user', userRoute);
const messageRoute = require('./routes/messageRoute');
app.use('/message', messageRoute);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
