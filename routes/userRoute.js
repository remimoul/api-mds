const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController');

router.route('/login').post(userControllers.userLogin);

router.route('/register').post(userControllers.createAUser);

router.route('/:user_id').put(userControllers.updateUser).delete(userControllers.deleteUser);

module.exports = router;
