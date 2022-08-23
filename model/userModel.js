const mongoose = require('mongoose')
const User = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim:true
    },
    email:{
        type: String,
        required:true,
        trim:true
    },
    mobile:{
        type: String,
        required:true,
        trim:true
    },
    password:{
        type: String,
        required:true,
        trim:true
    },
    gender:{
        type: String,
        default:null
    },
    address:{
        type: String,
       default:null
    },
    role:{
        type:String,
        default:"user"
    }
}, {
    collection: "users",
    timestamps:true
});



module.exports= mongoose.model("User" , User)