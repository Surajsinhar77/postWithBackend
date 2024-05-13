const express = require('express');
const {
	getALLPosts,
	getPostById,
	addNewPost,
	updatePostById,
	delPostById,
} = require('../controller/posts.controller');
const uploadPostMiddleware = require('../utlity/fileuploaderForPost');

const router = express.Router();

router.get('/getAllPosts', getALLPosts);
router.get('/getPostById/:id', getPostById);
router.post('/addNewPost',uploadPostMiddleware , addNewPost);
router.put('/updatePostById/:id', updatePostById);
router.delete('/delPostById/:id', delPostById);
// router.post('/contact')
module.exports = router;