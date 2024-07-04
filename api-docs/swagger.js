/**
 *  _    _ _____ _____
 * | |  | |_   _|  __ \
 * | |  | | | | | |  | |
 * | |  | | | | | |  | |
 * | |__| |_| |_| |__| |
 *  \____/|_____|_____/
 *
 */

/**
 * @swagger
 * /user/login:
 *  post:
 *    tags:
 *      - Utilisateur
 *    summary: Connecter un utilisateur
 *    description: ✔️ Login a user
 *    parameters:
 *      - in: body
 *        name: user
 *        description: The user to login
 *        schema:
 *          type: object
 *          required:
 *            - email
 *            - password
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */

/**
 * @swagger
 * /user/register:
 *  post:
 *    tags:
 *      - Utilisateur
 *    summary: Enregistrer un nouvel utilisateur
 *    description: ✔️ Register a new user
 *    parameters:
 *      - in: body
 *        name: user
 *        description: The user to login
 *        schema:
 *          type: object
 *          required:
 *            - email
 *            - password
 *            - role
 *          properties:
 *            firstName:
 *              type: string
 *            lastName:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            admin:
 *             type: integer
 *            role:
 *              type: string
 *              enum: ['Employé', 'Entreprise', 'Happiness Officer']
 *            company_name:
 *              type: string
 *
 *    responses:
 *      '200':
 *        description: A successful response
 */

/**
 * @swagger
 * /user/{id_user}:
 *   put:
 *     tags:
 *       - Utilisateur
 *     summary: Mettre à jour un utilisateur
 *     description: ✔️ update user
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token d'authentification
 *       - in: path
 *         name: id_user
 *         description: ID of the user to update
 *         required: true
 *         type: string
 *       - in: body
 *         name: user
 *         description: User data to update
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       '200':
 *         description: A successful response
 */

/**
 * @swagger
 * /user/{id_user}:
 *   delete:
 *     tags:
 *       - Utilisateur
 *     summary: Supprimer un utilisateur
 *     description: ✔️ delete user
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token d'authentification
 *       - in: body
 *         name: user
 *         description: Delete user account
 *         schema:
 *           type: object
 *           required:
 *             - email
 *           properties:
 *             email:
 *               type: string
 *     responses:
 *       '200':
 *         description: A successful response
 */

/**
 * @swagger
 * /message/send:
 *   post:
 *     tags:
 *       - Messagerie
 *     summary: Envoyer un message
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: The authorization token
 *       - in: body
 *         name: project
 *         description: The project to add
 *         schema:
 *           type: object
 *           required:
 *             - content
 *             - conversation_id
 *             - user_id
 *           properties:
 *             content:
 *               type: string
 *             conversation_id:
 *               type: integer
 *             user_id:
 *               type: integer
 *     responses:
 *       200:
 *         description: Message envoyé avec succès
 *         schema:
 *           type: object
 *           properties:
 *             content:
 *               type: string
 *             conversation_id:
 *               type: integer
 *             user_id:
 *               type: integer
 */

/**
 * @swagger
 * /message/create_conversation:
 *   post:
 *     tags:
 *       - Messagerie
 *     summary: Crée une conversation
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: The authorization token
 *       - in: path
 *         name: projet_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the project to update
 *       - in: body
 *         name: project
 *         description: Seulement un happiness officer peut créer une conversation
 *     responses:
 *       200:
 *         description: Conversation créée avec succès
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             imageUrl:
 *               type: string
 *             link:
 *               type: string
 */

/**
 * @swagger
 * /message/conversation/{conversation_id}:
 *   delete:
 *     tags:
 *       - Messagerie
 *     summary: Supprimer une conversation
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: The authorization token
 *       - in: path
 *         name: conversation_id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'id de la conversation à supprimer
 *     responses:
 *       200:
 *         description: Conversation supprimée avec succès
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 */

/**
 * @swagger
 * /message/conversation/{conversation_id}:
 *   get:
 *     tags:
 *       - Messagerie
 *     summary: Afficher tous les messages d'une conversation
 *     responses:
 *       200:
 *         description: Recupérer avec succès tous les messages d'une conversation
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 */

/**
 * @swagger
 * /journal/send:
 *   post:
 *     tags:
 *       - Tableau de bord Emotionnel
 *     summary: Ajouter une emotion dans le journal
 *     parameters:
 *       - in: body
 *         name: project
 *         description: The project to add
 *         schema:
 *           type: object
 *           required:
 *             - user_id
 *             - emotion
 *             - date
 *             - thoughts
 *           properties:
 *             user_id:
 *               type: integer
 *             emotion:
 *               type: string
 *             date:
 *               type: date
 *             thoughts:
 *               type: string
 *     responses:
 *       200:
 *         description: Ajout de l'émotion dans le journal
 *         schema:
 *           type: object
 *           properties:
 *             user_id:
 *               type: string
 *             emotion:
 *               type: string
 *             date:
 *               type: string
 *             thoughts:
 *               type: string
 */

/**
 * @swagger
 * /journal/get/{user_id}:
 *   put:
 *     tags:
 *       - Tableau de bord Emotionnel
 *     summary: Récupérer la liste des émotions
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: The authorization token
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: l'id de l'utilisateur pour lequel on veut récupérer les émotions
 *     responses:
 *       200:
 *         description: Récupération des émotions avec succès
 */

/**
 * @swagger
 * /journal/update/{user_id}/{emotion_id}:
 *   put:
 *     tags:
 *       - Tableau de bord Emotionnel
 *     summary: Mettre à jour une émotion
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: The authorization token
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de l'utilisateur pour lequel on veut mettre à jour l'émotion
 *      - in: path
 *        name: emotion_id
 *        required: true
 *        schema:
 *        type: string
 *        description: L'ID de l'émotion à mettre à jour
 *     responses:
 *       200:
 *         description: L'émotion a été mise à jour avec succès
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 */

/**
 * @swagger
 * /journal/delete/{user_id}/{emotion_id}:
 *   delete:
 *     tags:
 *       - Tableau de bord Emotionnel
 *     summary: Supprimer une émotion
 *     responses:
 *       200:
 *         description: A list of expro
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 */
