require('dotenv').config();
const User = require('../models/userModel');
const server = require('../index.js');
const request = require('supertest');
const sequelize = require('../database.js');

beforeAll(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

afterAll(async () => {
  await User.destroy({ where: { email: 'johndoe@gmail.com' } }); // Supprime l'utilisateur créé pendant le test
  await sequelize.close(); // Ferme la connexion à la base de données
  await new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) {
        console.error('Error closing server', err);
        reject(err);
      } else {
        console.log('Server closed successfully');
        resolve();
      }
    });
  });
});

//test de la route POST /user/register
test('TEST DE LA ROUTE = /user/register 🥲​', async () => {
  let res;
  try {
    res = await request(server).post('/user/register').send({
      lastName: 'Doe',
      firstName: 'John',
      email: 'johndoe@gmail.com',
      password: 'Mydigitallife2021',
      admin: 0,
      company_name: 'orange',
      role: 'Employé',
    });
  } catch (error) {
    console.error(error);
  }
  expect(res).toBeDefined();
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty('id');
  expect(res.body).toHaveProperty('lastName', 'Doe');
  expect(res.body).toHaveProperty('firstName', 'John');
  expect(res.body).toHaveProperty('email', 'johndoe@gmail.com');
  expect(res.body).toHaveProperty('admin', 0);
  expect(res.body).toHaveProperty('company_name', 'orange');
  expect(res.body).toHaveProperty('role', 'Employé');
});
