const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

router.route('/login').post(userControllers.userLogin);
router.route('/register').post(userControllers.createAUser);

router.route('/get/:id').get(jwtMiddleware.verifyToken, userControllers.getUser);

router.route('/update/:id').put(jwtMiddleware.verifyToken, userControllers.updateUser);

router.route('/delete/:id').delete(jwtMiddleware.verifyToken, userControllers.deleteUser);

module.exports = router;
