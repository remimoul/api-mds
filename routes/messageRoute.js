// messageRoute.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/send', messageController.sendMessage);
router.get('/conversation/:conversation_id', messageController.getConversation);

module.exports = router;
