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

//test pour mail invalide
it('REGISTER - Email invalide', async () => {
  let res;
  try {
    res = await request(server).post('/user/register').send({
      lastName: 'Doe',
      firstName: 'John',
      email: 'johndoe@test',
      password: 'Mydigitallife2021',
      admin: 0,
      company_name: 'orange',
      role: 'Employé',
    });
  } catch (error) {
    console.error('Error test : ', error);
  }
  expect(res).toBeDefined();
  expect(res.status).toBe(400);
  expect(res.body.message).toBe("Format d'email invalide");
});

//test pour mot de passe trop court
it('REGISTER - Mot de passe trop court', async () => {
  let res;
  try {
    res = await request(server).post('/user/register').send({
      lastName: 'Doe',
      firstName: 'John',
      email: 'johndoe@test.com',
      password: '123',
      admin: 0,
      company_name: 'orange',
      role: 'Employé',
    });
  } catch (error) {
    console.error('Error test : ', error);
  }
  expect(res).toBeDefined();
  expect(res.status).toBe(400);
  expect(res.body.message).toBe('Le mot de passe doit contenir au moins 8 caractères');
});

//test pour mail et mot de passe requis
it('REGISTER - Email et mot de passe requis', async () => {
  let res;
  try {
    res = await request(server).post('/user/register').send({
      lastName: 'Doe',
      firstName: 'John',
      email: '',
      password: '',
      admin: 0,
      company_name: 'orange',
      role: 'Employé',
    });
  } catch (error) {
    console.error('Error test : ', error);
  }
  expect(res).toBeDefined();
  expect(res.status).toBe(400);
  expect(res.body.message).toBe("Format d'email invalide");
});

//test de la route POST /user/register
it('REGISTER format ok 😁​​', async () => {
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
    console.error('Error test : ', error);
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

//test pour utilisateur existant
it('REGISTER - Utilisateur existant', async () => {
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
    console.error('Error test : ', error);
  }
  expect(res).toBeDefined();
  expect(res.status).toBe(400);
  expect(res.body.message).toBe('Un utilisateur avec cette adresse e-mail existe déjà');
});

// Test pour un utilisateur inexistant
it('LOGIN - Utilisateur inexistant', async () => {
  let res;
  try {
    res = await request(server).post('/user/login').send({
      email: 'nonexistent@test.com', // Assurez-vous que cet email n'existe pas dans votre base de données de test
      password: 'password',
    });
  } catch (error) {
    console.error('Error test : ', error);
  }
  expect(res).toBeDefined();
  expect(res.status).toBe(401);
  expect(res.body.message).toBe('Email ou mot de passe incorrect');
});

// Test pour un mot de passe incorrect
it('LOGIN - Mot de passe incorrect', async () => {
  let res;
  try {
    res = await request(server).post('/user/login').send({
      email: 'johndoe@test.com', // Assurez-vous que cet email existe dans votre base de données de test
      password: 'WrongPassword2021',
    });
  } catch (error) {
    console.error('Error test : ', error);
  }
  expect(res).toBeDefined();
  expect(res.status).toBe(401);
  expect(res.body.message).toBe('Email ou mot de passe incorrect');
});

it('USER/LOGIN ​​', async () => {
  let res;
  try {
    res = await request(server).post('/user/login').send({
      email: 'johndoe@test.com',
      password: 'Mydigitallife2021',
    });
  } catch (error) {
    console.error('Error test : ', error);
  }
  expect(res).toBeDefined();
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('token');
});

it('USER/UPDATE 😁​​', async () => {
  let res;
  try {
    res = await request(server).post('/user/login').send({
      email: 'johndoe@test.com',
      password: 'Mydigitallife2021',
    });
    //console.log("Login Response:", res.body);
  } catch (error) {
    console.error('Error test : ', error);
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
    console.error('Error test : ', error);
  }
  expect(res).toBeDefined();
  expect(res.status).toBe(200);
  //expect(res.body).toHaveProperty('message', 'Utilisateur modifié avec succès');
});
