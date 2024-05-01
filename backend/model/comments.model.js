const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
	
	commentInfo : {
		type : String,
		required : true,
	},

	like : {
		type : Number,
		default : 0
	},

	user : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'User',
		required : true,
	},

	post : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Post',
		required : true,
	},

	children : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Comment',
	}]

});


const commentModel = mongoose.model('Comment', commentsSchema);

module.export = commentModel;