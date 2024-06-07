// messageRoute.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

router.post('/send', messageController.sendMessage);
router.get('/conversation/:conversation_id', messageController.getConversation);
router.post('/create_conversation', jwtMiddleware.verifyToken, messageController.createConversation);
router.delete('/conversation/:conversation_id', jwtMiddleware.verifyToken,messageController.deleteConversation);

module.exports = router;
