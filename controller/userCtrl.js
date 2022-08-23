const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const {createAccessToken, createRefreshToken} = require('../middlerware/util')
const jwt = require('jsonwebtoken')
const config = require('../db')
const { create } = require('../model/userModel')
const userCtrl = {


    register: async(req,res)=>{
        try{
            // res.json("register works")
            const{name,email,mobile,password} = req.body;
            const passHash = await bcrypt.hash(password, 10);
            const newUser = User({
                name,
                email,
                mobile,
                password:passHash
            });
        const extEmail = await User.findOne({email});
        if(extEmail)
        return res.status(400).json({msg:"user email already exists"})
        const extMobile = await User.findOne({mobile});
        if(extMobile)
        return res.status(400).json({msg:"user mobile already exists"});
        await newUser.save();
        res.status(200).json({msg:"user registered successfully"})
        }
        catch (err){
            return res.status(500).json({msg:err.message})
        }
    },
    login: async (req,res)=>{
        try{
            // res.json("Login works")
            const{email,password}=req.body;
            const extUser =await User.findOne({email});
              if(!extUser)
                  return res.status(400).json({msg:"user doesnot exists."})
            const isMatch = await bcrypt.compare(password, extUser.password);
              if(!isMatch)
                   return res.status(400).json({msg:"password doesnot match"})

            const accessToken  =  createAccessToken({id: extUser._id});
            const refreshToken  =  createRefreshToken({id: extUser._id});

            res.cookie('refreshToken', refreshToken, {
                httpOnly:true, 
                path:'/auth/refreshToken',
                maxAge: 1*24*60*60*1000
            })

            res.json({accessToken})
        }
        catch (err){
            return res.status(500).json({msg:err.message})
        }
    },

    logout: async(req,res)=>{
        try{
           res.clearCookie('refreshToken' , {path: '/auth/refreshToken'});
           return res.status(200).json({msg:"successfully logout"})
        }
        catch (err){
            return res.status(500).json({msg:err.message})
        }
    },

    getUser: async(req,res)=>{
        try{
            // res.json({id: req.user})
            const user = await User.findById(req.user.id).select('-password')
            if(!user)
            return res.status(400).json({msg:"user doesnot exists..."})
            res.json({"userInfo":user})
        }
        catch (err){
            return res.status(500).json({msg:err.message})
        }
    },

    refreshToken: async(req,res)=>{
        try{
           const rToken = req.cookies.refreshToken;
           if(!rToken)
           return res.status(400).json({msg:"session expired, login again..."})
           jwt.verify(rToken, config.refreshTokenSecret, (err,user) =>{
               if(err)
               return res.status(400).json({msg:"session expired login again.."})
             const accessToken = createAccessToken({id:user.id})
             res.json({accessToken})
            })
        //    res.json({rToken})
        }
        catch (err){
            return res.status(500).json({msg:err.message})
        }
    }
}
module.exports = userCtrl;