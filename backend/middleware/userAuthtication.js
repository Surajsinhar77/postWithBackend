const jwt = require('jsonwebtoken');
const secretkey = process.env.secretKey;

const verifyToken = (req, res, next) => {
    const Authorization = req.headers['authorization'];
    try{
        const t = Authorization.split(' ')[1];
        if(token != undefined && token != null){
            if(token) {
                jwt.verify(token, secretkey, (err, decoded) => {
                    console.log("error hai: ",err)
                    console.log("error nhi hai: ",decoded)
                    if (err) {
                        return res.status(401).json({ message: 'Invalid token' });
                    }
                    console.log("decoded data: ", decoded)
                    next();
                });
            }else{
                return res.status(404).json({message: "token is not found or null"});
            }
        }else{
            return res.status(403).json({message : "Forbidden"});
        }
    }catch(err){
        return res.status(404).json({message:"Error while verifying from middleware",error:err});
    }
};

module.exports = verifyToken;