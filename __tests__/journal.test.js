let userId; // Ajouté pour corriger la portée de `userId`

const Journal = require('../models/journalModel.js');
const server = require('../index.js');
const request = require('supertest');
const sequelize = require('../database.js');
const User = require('../models/userModel.js');

beforeAll(async () => {
  try {
    await sequelize.authenticate();
    console.log('Test : Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

// Test pour émotion valide
it('SEND EMOTION - Emotion valide', async () => {
  let res;
  try {
    res = await request(server).post('/user/register').send({
      lastName: 'emotion_test',
      firstName: 'emotion_test',
      email: 'emotion@emotion.com',
      password: 'Mydigitallife2021',
      admin: 0,
      company_name: 'orange',
      role: 'Employé',
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    userId = res.body.id; // Utilisation de la variable `userId` déclarée au début
    console.log('userId:', userId);
  } catch (error) {
    console.error('Error test : ', error);
  }

  try {
    res = await request(server)
      .post('/journal/send')
      .send({
        user_id: `${userId}`, // Utilisation de la variable `userId` déclarée au début
        emotion: '&happy-test#232323',
        thoughts: 'I am happy',
        createdAt: new Date('2024-06-25T12:00:00Z'),
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.message).toBe('Emotion envoyée avec succès');
  } catch (error) {
    console.error('Error test : ', error);
  }
});

// Test pour émotion valide
describe('GET EMOTION - Emotion valide', () => {
  let token;

  beforeEach(async () => {
    const resLogin = await request(server).post('/user/login').send({
      email: 'emotion@emotion.com',
      password: 'Mydigitallife2021',
    });
    expect(resLogin.body).toHaveProperty('token');
    token = resLogin.body.token;
  });

  it('Doit retourner 201 pour une émotion valide', async () => {
    const res = await request(server).get(`/journal/get/${userId}`).set('Authorization', token);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Emotions récupérées avec succès');
  });
});

// Test pour utilisateur non trouvé
describe('GET EMOTION - Utilisateur non trouvé', () => {
  let token;

  beforeEach(async () => {
    const resLogin = await request(server).post('/user/login').send({
      email: 'emotion@emotion.com',
      password: 'Mydigitallife2021',
    });
    expect(resLogin.body).toHaveProperty('token');
    token = resLogin.body.token;
  });

  it('Doit retourner 404 pour un utilisateur non trouvé', async () => {
    const res = await request(server)
      .get('/journal/get/24332') // Utilisateur inexistant
      .set('Authorization', token);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Aucune émotion trouvée pour cet utilisateur');
  });
});

afterAll(async () => {
  if (userId) {
    await Journal.destroy({ where: { user_id: userId } });
    await User.destroy({ where: { email: 'emotion@emotion.com' } }); // Supprime l'utilisateur à la fin des tests
    await sequelize.close(); // Ferme la connexion à la base de données
    // Ferme la connexion au serveur express
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
  }
});
