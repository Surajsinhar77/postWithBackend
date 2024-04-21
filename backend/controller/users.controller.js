const usersModel = require('../model/users.model.js');
const bcrypt = require('bcrypt');
const serviceAuth = require('../service/serviceAuth.js');

async function signUpUser(req, res){
	const { name, email, password } = req.body;

    try {
        const isUserExist = await usersModel.findOne({ email: email });

        if (isUserExist) {
            return res.status(409).json({
                error: 'User already registered',
                message: 'The username or email is already taken',
                userExist: false
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const token = serviceAuth.createUserToken({ name, email });

        const user = new usersModel({
            name: name,
            email,
            password: hashPassword,
            token: token,
        });

        const result = await user.save();
        res.cookie('uid', token, { httpOnly: true });
        res.setHeader('Authorization', `Bearer ${token}`);
        return res.status(201).json({ message: "User is sucessfull SignUp", result });
    } catch (err) {
        console.log("here is the errror ", err);
        return res.status(404).json({ message: err.message, err });
    }
};


async function loginUser(req, res){
	const { email, password } = req.body;

    try {
        const userExist = await usersModel.findOne({ email: email });
        if (!userExist) {
            return res.json({ message: "user doesn't Exist" });
        }
        const authToken = req.cookies?.uid;

        if (!authToken) {
            const userExistInfo = await bcrypt.compare(password, userExist.password);
            if (userExistInfo) {
                const token = serviceAuth.createUserToken({ name: userExist.name, email });
                res.cookie('uid', token, { httpOnly: true, });
                return res.status(200).json({
                    message: "You are SuccessFull logged in",
                    result: userExist, userExistInfo
                })
            }
            
            return res.status(404).json({ message: "Invalid Credintial", userExistInfo });
        }

        return res.json({ message: "You are allow to login ", UserVerification });
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "You are getting Error", errorMsg: err });
    }
};

module.exports = {
	signUpUser,
	loginUser,
}