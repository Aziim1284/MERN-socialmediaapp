const jwt = require('jsonwebtoken');
const config = require('../db');
const userMiddleware = async (req , res , next)=>{
 try{
     const token = req.header("Authorization")
     jwt.verify(token , config.accessTokenSecret, (err , user) =>{
         if(err)
         return res.status(400).json({msg:"Invalid Authorization"})
        req.user = user;
        next();
     })
 }
 catch (err){
     return res.status(500).json({msg:err.mesage})
 }
};
module.exports = userMiddleware