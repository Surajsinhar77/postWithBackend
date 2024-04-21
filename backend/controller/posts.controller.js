const postsModel = require('../model/posts.model.js');
const mongoose = require('mongoose');

async function getALLPosts(req, res){
	try{
		const posts  = await postsModel.find({});
		if(posts){
			return res.status(200).json({message : "All the posts send sucessfully", posts: posts});
		}
		return res.status(404).json({message : "post is empty / Some error while query"});
	}catch(err){
		console.log("This is the error message by doing getALLPosts ", err);
		return res.status(401).json({message : err.message});
	}
};



async function getPostById(req, res){
	const id = req.params;

	try{
		if(!id){
			return res.status(401).json({message: "id is invalid or incorrect", id : id});
		}
		const _id = new mongoose.Types.ObjectId(id);
		const post = await postsModel.findOne(_id);
		if(post){
			return res.status(200).json({message : "Post is sucessfully fetch", post : post});
		}

		return res.status(404).json({message : "No post exist with this id / may id is invalid"});
	}catch(err){
		console.error("This error is in the getPostById function error", err);
		return res.json({message: err.message});
	}
};


async function addNewPost(req, res){
	const postInfo = req.body;

	try{
		const postAlreadyExist = await postsModel.findOne({title :postInfo.title});
		if(postAlreadyExist){
			return res.json({message : "This post is already exist in our System"});
		}

		const userId = new mongoose.Types.ObjectId(req.query.id);
		const newPost = await postsModel.create({
			title : postInfo.title,
			discription : postInfo.discription,
			user : userId,
		})

		return res.json({message : "New Post is sucessfully Created and added", post : newPost});
	}catch(err){
		console.error("This error is in the addNewPost function error", err);
		return res.json({message : err.message});
	}	
};

async function updatePostById(req, res){
	try{
		const id = req.params.id;
		const dataToUpdate = req.body;
		const _id = mongoose.Types.ObjectId(id);
		const posts = await postsModel.findOne(_id);

		if(!posts){
			return res.json({message : "ivaild id / post not exist ", sucess : false});
		}


		//update the postmodel
		const updateResult = await postsModel.findOneAndUpdate(
			{_id : _id}, 
			{ set : {title : dataToUpdate.title}},
			{new : true} // return the updated document
		);
	}catch(err){
		return res.json({message : err.message, error : err});
	}
};

asunc function delPostById(req, res){
	try{
		const id = req.params.id;
		const _id = mongoose.Types.ObjectId(id);
		const postExist = await postsModel.findOne({_id , _id});
		if(!postExist){
			return res.status(404).json.({message: "Post not exist / invaild id "});
		}

		const deletePostResult = await postsModel.deleteOne({_id:_id});

		return res.status(200).json({message: "Post is sucessfully deleted ", deleteInfo : deletePostResult});

	}catch(err){
		console.error("The error from the delPostBtId is this : ", err);
		return res.json({message: "Some error while deleting Post by Id  ERROR is : ",err});
	}
}


module.exports = {
	getALLPosts,
	getPostById,
	addNewPost,
	updatePostById,
	delPostById,
}