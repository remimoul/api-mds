const express = require('express');
const router = express.Router();
const journalControllers = require('../controllers/journalController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

router.route('/send').post(journalControllers.sendEmotion);
router.route('/get/:user_id').get(jwtMiddleware.verifyToken, journalControllers.getEmotion);
router.route('/update/:user_id/:emotion_id').put(jwtMiddleware.verifyToken, journalControllers.updateEmotion);
router.route('/delete/:user_id/:emotion_id').delete(jwtMiddleware.verifyToken, journalControllers.deleteEmotion);

module.exports = router;
