const express = require('express');
const router = express.Router();
const journalControllers = require('../controllers/journalController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

router.route('/send').post(journalControllers.sendEmotion);
router.route('/get/:user_id').get(jwtMiddleware.verifyToken,journalControllers.getEmotion);

module.exports = router;
