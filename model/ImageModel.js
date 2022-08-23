const mongoose = require('mongoose')
const Image = new mongoose.Schema({
    fieldname:{
        type:String,
        required:true
    },
    originalname:{
         type:String,
        required:true
    },
    mimetype:{
         type:String,
        required:true
    },
    destination:{
         type:String,
        required:true
    },
    filename:{
         type:String,
        required:true
    },
    path:{
         type:String,
        required:true
    },

},{
    collection:"images",
    timestamps:true
})

module.exports = mongoose.model("image", Image);