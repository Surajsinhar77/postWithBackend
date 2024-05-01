const express = require('express');
const {
        addNewComment,
        deleteComment,
        getAllComments,
        getCommentById,
        replyToComment
} = require('../controller/comments.controller');

const router = express.Router();

router.post('/addNewComment/:id', addNewComment); //
router.post('/replyToComment/:id', replyToComment); //
router.delete('/deleteComment/:id', deleteComment);
router.get('/getAllComments/:id', getAllComments); //
router.get('/getCommentById/:id', getCommentById);//


module.exports = router;