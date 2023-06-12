const jwt = require('jsonwebtoken');
const jwtSecretCode = "AkshayKumarReddy";

const fetchUser=(req,res,next)=>{
    //get the token in the header
    const token = req.header('token');
    if(!token){
        res.status(401).json({error:"please send a token"})//if no token throwing error
    }
    try{
        const data = jwt.verify(token,jwtSecretCode); //getting user detains by using token and secretCode
        req.user = data;// assigning user details to req.user
        next(); //invoing an router which imported and used this js file
    }catch(error){
        res.status(401).json({error:"please send a valid token"})
    }
};
module.exports=fetchUser;