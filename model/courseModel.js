const mongoose = require('mongoose');
const Course = new mongoose.Schema({
    title:{
        type: String,
        required:true,
        trim:true
    },
    fee:{
        type:Number,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:Object,
        default:{}
    }
},{
    collection:"course",
    timestamps:true
})
module.exports =mongoose.model("course", Course)