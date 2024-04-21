const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey;


function createUserToken({name,email}){
	return jwt.sign({
		_id : name,
		email : email
	},
		secretKey
	);
};


const getUserToken = (token)=>{
    if(!token){
        return null;
    }
    return jwt.verify(token, secretkey);
};


module.exports = {
	createUserToken,
	getUserToken
}