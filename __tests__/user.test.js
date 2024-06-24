require('dotenv').config();
const User = require('../models/userModel');
const server = require('../index.js');
const request = require('supertest');
const sequelize = require('../database.js');

beforeAll(async () => {
  try {
    await sequelize.authenticate();
    console.log('Test : Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

afterAll(async () => {
  await User.destroy({ where: { email: 'johndoe@test.fr' } }); // Supprime l'utilisateur à la fin des test
  await sequelize.close(); // Ferme la connexion à la base de données
//ferme la connexion au serveur express
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
test('USER/REGISTER 😁​​', async () => {
  let res;
  try {
    res = await request(server).post('/user/register').send({
      lastName: 'Doe',
      firstName: 'John',
      email: 'johndoe@test.com',
      password: 'Mydigitallife2021',
      admin: 0,
      company_name: 'orange',
      role: 'Employé',
    });
  } catch (error) {
    console.error("Error test : ",error);
  }
  expect(res).toBeDefined();
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty('id');
  expect(res.body).toHaveProperty('lastName', 'Doe');
  expect(res.body).toHaveProperty('firstName', 'John');
  expect(res.body).toHaveProperty('email', 'johndoe@test.com');
  expect(res.body).toHaveProperty('admin', 0);
  expect(res.body).toHaveProperty('company_name', 'orange');
  expect(res.body).toHaveProperty('role', 'Employé');
});

test('USER/LOGIN 😁​​', async () => {
    let res;
    try {
        res = await request(server).post('/user/login').send({
        email: 'johndoe@test.com',
        password: 'Mydigitallife2021',
        });
    } catch (error) {
        console.error("Error test : ",error);
    }   
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
}
);

test('USER/UPDATE 😁​​', async () => {
    let res;
    try {
        res = await request(server).post('/user/login').send({
        email: 'johndoe@test.com',
        password: 'Mydigitallife2021',
        });
        console.log("Login Response:", res.body);
    } catch (error) {
        console.error("Error test : ",error);
    }
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('id');
    const token = res.body.token;
    const userId = res.body.id;
    try {
        res = await request(server).put(`/user/update/${userId}`).set('Authorization', token).send({
        email: 'johndoe@test.fr',
        password: 'Mydigitallife2024', 
        });
    } catch (error) {
        console.error("Error test : ",error);
    }
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
}
);