const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
	user :{
		type : mongoose.Schema.Types.ObjectId,
		ref : 'User',
		required : true,
	},

	post : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Post',
		required : true,
	},

	commentInfo : {
		type : String,
		required : true,
	},

	like : {
		type : Number,
		required : true,
	}
});


const commentModel = mongoose.model('Comment', commentsSchema);

module.export = commentModel;