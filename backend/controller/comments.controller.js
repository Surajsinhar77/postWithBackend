const mongoose = require('mongoose');
const commentModel = require('../model/comments.model.js');
const postsModel = require('../model/posts.model.js');


async function addNewComment(req, res){
	try{
		const commentDetail = req.body;
		const postId = req.params.id;
		const userId = req.user?._id;

		if(!userId){
			return res.status(401).json({message : "User is Unauthticated"});
		}

		if(!postId){
			return res.status(402).json({message : "Invaid post id or post"})
		}
		const _id = new mongoose.Types.ObjectId(postId);

		const post = await postsModel.findById(_id);
		if(!post){
			return res.status(404).json({message : "Post not exist"});
		}

		const uId = new mongoose.Types.ObjectId(userId);

		const newComment = await commentModel.create({
			commentInfo : commentDetail?.comment,
			user : uId,
			post : _id,
		});

		const updatePost = await postsModel.findByIdAndUpdate(
			{
				_id : post._id
			},
			{
				$push :{ parentComment : newComment?._id }
			},
			{
				new : true
			}
		);

		return res.status(200).json({message : "New Comment is sucessfully created", post : updatePost});
	}catch(err){
		return res.json({message : err.message});
	}
}


async function deleteComment(req, res){
	try {
        const commentId = req.params.id;
        const comment = await commentModel.findById(commentId);

		console.log(comment);
        if(!comment){
            return res.status(404).json({message : "Comment not exist"});
        }

        // Trigger the pre('remove') middleware for the deleted comment
        await comment.remove();
        
        return res.status(200).json({message :"Comment deleted successfully"}); 
    } catch(err) {
        return res.json({message : err.message});
    }
}

async function getAllComments(req, res){
	try{
		const postId = req.params.id;

		const allComment = await postsModel.findById(postId).populate('parentComment');
		if(!allComment){
			return res.status(404).json({message : "Comment not exist"});
		}
		return res.json({message : "Fetch all the comments sucessfully", comments : allComment.parentComment});
	}catch(err){
		return res.json({message : err.message});
	}
}

async function getCommentById(req, res){
	try{
		const commentId = req.params.id;

		const Comment = await commentModel.findById({_id : commentId}).populate({path:'user', select : '-password -token'});
		if(!Comment){
			return res.status(404).json({message : "Comment not exist"});
		}
		return res.json({message : "Fetch comment sucessfully", comment : Comment});
	}catch(err){
		return res.json({message : err.message});
	}
}

async function replyToComment(req, res){
	try{
		const commentDetail = req.body; // postId,comment,
		const commentId = req.params?.id;
		const userId = req.user?._id;

		if(!commentId){
			return res.status(404).json({message : "Parent comment Id is invaild or not present"});
		}

		const mainComment = await commentModel.findById({_id : commentId});
		if(!mainComment){
			return res.status(404).json({message : "Main Comment is not exist now"});
		}

		if(!userId && !userId == undefined && userId === undefined){
			return res.status(401).json({message : "User is Unauthticated"});
		}

		if(!commentDetail?.postId && !commentDetail.postId == undefined && commentDetail.postId === undefined){
			return res.status(402).json({message : "Invaid post id or post"})
		}

		const _id = new mongoose.Types.ObjectId(commentDetail?.postId);
		const post = await postsModel.findById(_id); 

		if(!post){
			return res.status(404).json({message : "Post not exist"});
		}

		const uId = new mongoose.Types.ObjectId(userId);

		const newComment = await commentModel.create({
			commentInfo : commentDetail?.comment,
			user : uId,
			post : _id,
		});

		if(!newComment){
			return res.status(404).json({message : "Comment Creation faild"});
		}

		const updateMainComment = await commentModel.findByIdAndUpdate(
			{
				_id : commentId
			},
			{
				$push : { children : newComment?._id}
			},
			{ new : true }
		).populate('children')

		return res.status(200).json({message : "Comment is sucessfully created", comment : updateMainComment});
	}catch(err){
		return res.json({message : err.message});
	}

}

module.exports = {
	addNewComment,
	deleteComment,
	getAllComments,
	getCommentById,
	replyToComment
};