const usersModel = require('../model/users.model.js');
const bcrypt = require('bcrypt');
const serviceAuth = require('../service/serviceAuth.js');

async function signUpUser(req, res){
    try {
	    const { name, email, password } = req.body;
        const isUserExist = await usersModel.findOne({email: email});

        if (isUserExist) {
            res.clearCookie('accessToken');
            return res.status(409).json({
                error: 'User already registered',
                message: 'The username or email is already taken',
                userExist: false
            });
        }

        const authToken = req?.cookies?.accessToken;

        if(!authToken){
            const hashPassword = await bcrypt.hash(password, 10);

            if(!req?.cloudinaryUrl){
                console.log(req.cloudinaryUrl)
                res.clearCookie('accessToken');
                return res.json({message : "File path is invalid "});
            }
            
            const user = await usersModel.create({
                name,
                email,
                password : hashPassword,
                profileImage : req.cloudinaryUrl,
            });

            const token = serviceAuth.createUserToken({ id: user._id, email: user.email });
            
            const updateUserToken = await usersModel.findOneAndUpdate({ email: email }, { $set: {token: token} }, { new: true })

            const options = {
                httpOnly: true,
                secure: true,
            }
            

            const userResult ={
                id : updateUserToken._id,
                name: updateUserToken.name,
                email: updateUserToken.email,
                token: updateUserToken.token,
                profileImage: updateUserToken.profileImage
            }
            res.cookie("accessToken" , token, options);
            res.setHeader('Authorization', `Bearer ${token}`);
            return res.status(201).json({ message: "User is sucessfull SignUp", result:  userResult });
        }
        res.setHeader('Authorization', `Bearer ${authToken}`);
        return res.status(409).json({message : "Another user is already loggedIn"});
    } catch (err) {
        res.clearCookie('accessToken');
        console.log("here is the errror ", err);
        return res.status(404).json({ message: err.message, err });
    }
};

async function loginUser(req, res){
    try {
	    const { email, password } = req.body;
        const userExist = await usersModel.findOne({ email: email });
        if (!userExist) {
            res.clearCookie('accessToken');
            res.setHeader('Authorization', `Bearer ${null}`);
            return res.json({ message: "user doesn't Exist" });
        }

        const authToken = req?.cookies?.accessToken;
        if (!authToken) {
            const userExistInfo = await bcrypt.compare(password, userExist.password);
            if (userExistInfo) {
                const token = serviceAuth.createUserToken({ id: userExist._id, email: userExist.email });

                const updateToken = await usersModel.findOneAndUpdate({ email: email }, { token: token }, { new: true } ).select('-password -__v');
               
                const options = {
                    httpOnly: true,
                    secure: true,
                }

                res.cookie("accessToken" , token, options);
                res.setHeader('Authorization', `Bearer ${token}`);
                
                return res.status(200).json({
                    message: "You are SuccessFull logged in",
                    result: updateToken, 
                    userExist : userExistInfo
                })
            }
            res.clearCookie('accessToken');
            res.setHeader('Authorization', `Bearer ${null}`);
            return res.status(404).json({ message: "Invalid Credintial", userExistInfo });
        }
        const userResult = {
            id : userExist._id,
            name: userExist.name,
            email: userExist.email,
            token: userExist.token,
            profileImage: userExist.profileImage
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
        const user = await usersModel.findById(_id).select('-password -token');

        if (!user) {
            return res.status(404).json({ message: "User not found" , logout : false});
        }
        const token = req?.cookies?.accessToken;
        
        if (!token) {
            res.setHeader('Authorization', `Bearer ${null}`);
            return res.status(404).json({ message: "You are not loggedIn" , logout : true});
        }

        const userLogout = await usersModel.findOneAndUpdate({ _id: _id },{ $set : { token : null }}, { new: true }).select('-password -token');

        res.clearCookie('accessToken');
        res.setHeader('Authorization', `Bearer ${null}`);
        return res.status(200).json({ message: "You are successfully logout", logout : true});
    } catch (error) {
        console.log("This error from the userlogout function : ",error);
        return res.status(404).json({ message: "You are getting error", error });
    }
}


async function getUserById(req, res){
    try {
	    const id = req?.params?.id;
        
        if(!id && id == undefined && id === undefined){
            return res.json({message: "Undefine given user Id"});
        }
        const isUserExist = await usersModel.findById({_id : id}).select('-password -token');

        if (!isUserExist) {
            return res.status(409).json({
                error: 'User not Exist',
                message: 'This user is not exist in our system',
                userExist: false
            });
        }

        return res.status(200).json({ message: "User is found", result: isUserExist });
    } catch (err) {
        console.log("here is the errror ", err);
        return res.status(404).json({ message: err.message, err });
    }
};

module.exports = {
	signUpUser,
	loginUser,
    logoutUser,
    getUserById
}