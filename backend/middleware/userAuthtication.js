const jwt = require('jsonwebtoken');
const secretkey = process.env.secretKey;

const verifyToken = (req, res, next) => {
    try{
        const Authorization = req.headers['authorization'];
        const token = Authorization && Authorization.split(' ')[1];
        if(token != undefined && token != null){
            if(token) {
                jwt.verify(token, secretkey, (err, decoded) => {
                    if (err) {
                        res.cookie("accessToken" , token, options);
                        return res.status(401).json({ message: 'Invalid token',auth: false });
                    }
                    req.user = decoded;
                    next();
                });
            }else{
                res.cookie("accessToken" , token, options);
                return res.status(404).json({message: "token is not found or null", auth: false});
            }
        }else{
            res.cookie("accessToken" , token, options);
            return res.status(401).json({message : "Authtication Fails", auth: false});
        }
    }catch(err){
        console.log(" this is from middleware  catch ",err)
        res.cookie("accessToken" , token, options);
        return res.status(404).json({message:"Error while verifying from middleware",error:err});
    }
};

module.exports = verifyToken;

// put this in signup to check if user is already exist