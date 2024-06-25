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
  
  afterAll(async () => {
     await User.destroy({ where: { email: 'emotion@emotion.com' } }); // Supprime l'utilisateur à la fin des test
     await Journal.destroy({ where: { emotion: '&happy-test#232323' } }); // Supprime l'utilisateur à la fin des test
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

//test pour émotion non valide
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
    } catch (error) {
      console.error("Error test : ",error);
    }
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    const userId = res.body.id;

    try {
        res = await request(server).post('/journal/send').send({
        user_id: userId,
        emotion: '&happy-test#232323',
        thoughts: 'I am happy',
        });
    } catch (error) {
        console.error("Error test : ",error);
    }
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Emotion envoyée avec succès');
});



//test pour émotion valide
describe('GET EMOTION - Emotion valide', () => {
  let token;

  beforeEach(async () => {
    const resLogin = await request(server).post('/user/login').send({
      email: 'emotion@emotion.com',
      password: 'Mydigitallife2021',
    });
    expect(resLogin.body).toHaveProperty('token');
    expect(resLogin.body).toHaveProperty('id');
    token = resLogin.body.token;
    userId = resLogin.body.id;
  });
  it('Doit retourner 201 pour une émotion valide', async () => {
    const res = await request(server)
      .get(`/journal/get/${userId}`)
      .set('Authorization', token);

    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Emotions récupérées avec succès');
  });
});


//test pour emotion non trouver sur un utilisateur

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
      .get('/journal/get/24332')
      .set('Authorization', token);

    expect(res).toBeDefined();
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Aucune émotion trouvée pour cet utilisateur');
  });
});


// //test pour émotion non trouvée

// test('UPDATE EMOTION - Emotion non trouvée', async () => {
//     let res;
//     try {
//         res = await request(server).put('/journal/update/1/2').send({
//         emotion: 'sad',
//         thoughts: 'I am sad',
//         });
//     } catch (error) {
//         console.error("Error test : ",error);
//     }
//     expect(res).toBeDefined();
//     expect(res.status).toBe(404);
//     expect(res.body.message).toBe('Aucune émotion trouvée pour cet utilisateur avec cet ID');
// }
// );

