const jwt = require('jsonwebtoken');
require('dotenv').config();
const Auth=(req,res,next)=>{
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.status(401).json("Error token not found")
    }
    const token = authorization.split(' ')[1];
    if(!token){
        return res.status(401).son({error:"unauthorized"})
    }
    try{
        const decoded= jwt.verify(token,process.env.Jwt_Secret);
        req.user = decoded;
        next();
    }
    catch(err){
        console.log(`auth error: ${err}`);
        res.status(401).json({error:'invalid token'})
    }
}

const generateToken =(userData)=>{
    return jwt.sign(userData,process.env.Jwt_Secret)
}

module.export={
    Auth,generateToken
}