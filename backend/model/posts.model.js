const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
	title : {
		type : String,
		required : true,
		unique : true,
	},

	discription : {
		type : String,
		required : true,
	},

	like : {
		type : Number,
		required : true,
		default : 0, 
	},

	user : {
		type : mongoose.Schema.Types.ObjectId,
		required : true,
		ref : 'User',
	},

	comment : {
		type : mongoose.Schema.Types.ObjectId,
		required : true,
		ref : 'Comment',
	}
});

const postsModel = mongoose.model('Post', postsSchema);

module.exports = postsModel;