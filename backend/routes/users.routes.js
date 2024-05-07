const express = require('express');
const userController = require('../controller/users.controller');
const userAuthtication = require('../middleware/userAuthtication');
const uploadMiddleware = require('../utlity/fileuploader.middleware');
const router = express.Router();


router.post('/signup', uploadMiddleware ,userController.signUpUser);
router.post('/login', userController.loginUser);
router.get('/logout', userAuthtication ,userController.logoutUser);
router.get('/getUser/:id',userAuthtication, userController.getUserById);

module.exports = router;
