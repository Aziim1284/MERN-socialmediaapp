const express = require('express')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination:(req, file , cb) =>{
        cb(null , "public/")
    },
    filename:(req,file,cb) =>{
        cb(null, `${new Date().getTime().toString()}-${file.fieldname}${path.extname(file.originalname)}`)
    }
});

const validateFile = (file , cb) => {
    let allowedFileType = /jpg|png|gif/;
    let extName = allowedFileType.test(path.extname(file.originalname).toLocaleLowerCase())
    if(extName){
        return cb(null , true)
    }else{
        return cb("Invalid File Type")
    }
}

const upload = multer({
    storage:storage,
    limits:{fileSize: 50* 1024*1024},
    fileFilter:(req,file,cb) => {
        validateFile(file,cb)
    }
}).single("myFile")

module.exports = upload;