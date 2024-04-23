const usersModel = require('../model/users.model.js');
const bcrypt = require('bcrypt');
const serviceAuth = require('../service/serviceAuth.js');

async function signUpUser(req, res){
    try {
	    const { name, email, password } = req.body;
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

        const resultuser = await user.save();

        const options = {
            httpOnly: true,
            secure: true,
        }
        res.cookie("accessToken" , token, options);
        res.setHeader('Authorization', `Bearer ${token}`);
        const userResult ={
            id : resultuser._id,
            name: resultuser.name,
            email: resultuser.email,
            token: resultuser.token,
        }
        return res.status(201).json({ message: "User is sucessfull SignUp", result:  userResult });
    } catch (err) {
        console.log("here is the errror ", err);
        return res.status(404).json({ message: err.message, err });
    }
};


async function loginUser(req, res){
    try {
	    const { email, password } = req.body;
        const userExist = await usersModel.findOne({ email: email });
        if (!userExist) {
            return res.json({ message: "user doesn't Exist" });
        }
        const authToken = req.cookies?.accessToken;
        
        if (!authToken) {
            const userExistInfo = await bcrypt.compare(password, userExist.password);
            if (userExistInfo) {
                const token = serviceAuth.createUserToken({ id: userExist._id, email: userExist.email });

                const updateToken = await usersModel.findOneAndUpdate({ email: email }, { token: token }, { new: true } );
                const userResult = {
                    id : updateToken._id,
                    name: updateToken.name,
                    email: updateToken.email,
                    token: updateToken.token,
                }
                const options = {
                    httpOnly: true,
                    secure: true,
                }
                res.cookie("accessToken" , token, options);
                res.setHeader('Authorization', `Bearer ${token}`);
                
                return res.status(200).json({
                    message: "You are SuccessFull logged in",
                    result: userResult, 
                    userExist : userExistInfo
                })
            }
            
            return res.status(404).json({ message: "Invalid Credintial", userExistInfo });
        }
        const userResult = {
            id : userExist._id,
            name: userExist.name,
            email: userExist.email,
            token: userExist.token,
        }
        res.setHeader('Authorization', `Bearer ${authToken}`);
        return res.json({ message: "You are already login to login ", result : userResult, userExist : true});
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "You are getting Error", errorMsg: err });
    }
};



async function logoutUser(req, res){
    try {
        const _id = req.user._id;
        const user = await usersModel.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const token = req.cookies?.accessToken;
        if (!token) {
            return res.status(404).json({ message: "You are not logged in" });
        }
        const userLogout = await usersModel.findOneAndUpdate({ _id: _id }, { token: null }, { new: true });

        res.clearCookie('accessToken');
        res.setHeader('Authorization', `Bearer ${null}`);
        const userDetail = {
            id : userLogout._id,
            name: userLogout.name,
            email: userLogout.email,
            token: userLogout.token,
        }
        return res.status(200).json({ message: "You are successfully logout", userDetail });
    } catch (error) {
        console.log("This error from the userlogout function : ",error);
        return res.status(404).json({ message: "You are getting error", error });
    }
}

module.exports = {
	signUpUser,
	loginUser,
    logoutUser
}