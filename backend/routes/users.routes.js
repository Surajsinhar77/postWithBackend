const express = require('express');
const userController = require('../controller/user.controller.js');
const router = express.router();


router.post('/signup', userController.signUpUser);
router.post('/login', userController.loginUser);


module.exports = router;
