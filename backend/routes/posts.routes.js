const express = require('express');
const {
	getALLPosts,
	getPostById,
	addNewPost,
	updatePostById,
	delPostById,
} = require('../controller/posts.controller');
const uploadMiddleware = require('../utlity/fileuploader.middleware');

const router = express.Router();

router.get('/getAllPosts', getALLPosts);
router.get('/getPostById/:id', getPostById);
router.post('/addNewPost', uploadMiddleware, addNewPost);
router.put('/updatePostById/:id', updatePostById);
router.delete('/delPostById/:id', delPostById);

module.exports = router;