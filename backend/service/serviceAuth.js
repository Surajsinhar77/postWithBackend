const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey;


function createUserToken({id,email}){
	return jwt.sign({
		_id : id,
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