const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuthenticated = async (req,res,next) => {
    const {token} = req.cookies;
    if(token){
        try{
            const decode = jwt.verify(token,process.env.JWT_KEY);
            req.user = await User.findById(decode._id); 
            next();
        }catch(e){
            res.send({"success" : false,"message" : "token invalid"})
        }
    }else{
        res.json({"success" : false,"message" : "not Authenticated"})
    }
}

module.exports = {isAuthenticated};