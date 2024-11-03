const swaggerJsDoc = require('swagger-jsdoc');



const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'API GrinEasy',
        description: "Cette API permet de gérer les utilisateurs, les conversations et les messages de l'application GrinEasy",
        contact: {
          name: 'Rémi',
        },
        //servers: [process.env.HEROKU_URL],
        servers: ['http://localhost:3000'],
      },
    },
    apis: ['./api-docs/swagger.js'],
  };

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;