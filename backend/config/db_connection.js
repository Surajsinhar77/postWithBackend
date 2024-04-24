const mongoose = require('mongoose');

async function connectionToDB(){
	const uri = process.env.MONGO_DB_URL;
	mongoose.connect(uri).then(()=>{
		console.log("Database is sucessfull connected");
		return true;
	}).catch((err)=>{
		console.log("Error in the connection ", err);
		console.log("Database is not connected");
		return false;
	})
};

module.exports = connectionToDB;
