const express = require('express');
const userController = require('../controller/users.controller')
const userAuthtication = require('../middleware/userAuthtication');
const router = express.Router();


router.post('/signup', userController.signUpUser);
router.post('/login', userController.loginUser);
router.get('/logout', userAuthtication ,userController.logoutUser);
router.get('/getUser/:id',userAuthtication, userController.getUserById);

module.exports = router;
