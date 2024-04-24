const mongoose = require('mongoose');

function connectionToDB(){
	mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
		console.log("Database is sucessfull connected");
		return true;
	}).catch((err)=>{
		console.log("Error in the connection ", err);
		return false;
	})
};

module.exports = connectionToDB;
