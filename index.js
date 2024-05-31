const express = require('express');
const app = express();
const port = process.env.PORT || 3005;
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./database.js');

// Importez les modèles
require('./models/userModel');
require('./models/userHapinessModel');
require('./models/companyModel');
require('./models/conversationModel');  
require('./models/messagesModel');
require('./models/foreignkeyModel');

//   sequelize.authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//     return sequelize.sync({ force: false});
// })
// .then(() => {
//     console.log('All models were synchronized successfully.');
// })
// .catch(error => console.error('Unable to connect to the database:', error));

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