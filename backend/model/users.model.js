const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
	name : {
		type : String,
		required : true,
	},

	email : {
		type : String,
		required : true,
		unique : true,
	},

	password : {
		type : String,
		required : true,
	},
	profileImage : {
		type : String,
		required : true,
	},

	token : {
		type : String,
	}
});

const usersModel = mongoose.model('User',usersSchema );

module.exports = usersModel;