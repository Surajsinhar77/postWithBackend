const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
	title : {
		type : String,
		required : true,
		unique : true,
	},
	postImage : {
		type : String,
		required : true,
	},

	discription : {
		type : String,
		required : true,
	},

	like : {
		type : Number,
		default : 0, 
	},

	user : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'User',
		required : true,
	},

	parentComment : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref : 'Comment'
		}
	]
},
{ timestamps : true }
);

const postsModel = mongoose.model('Post', postsSchema);

module.exports = postsModel;