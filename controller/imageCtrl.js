const Image = require('../model/ImageModel')
const fs = require('fs')
const ImageCtrl = {
    fileRead:async (req,res) =>{
        try {
            // res.json({msg:"file read Works"})
            let data = await Image.find();

            return res.json({
                length:data.length,
                images:data
            })
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    fileUpload:async (req,res) =>{
        try {
            // res.json({data:req.file})
            const  {fieldname, originalname , mimetype , destination, filename , path  } = req.file;

            let extFile = await Image.findOne({originalname});
            if(extFile){
                fs.unlinkSync(path)
                return res.status(400).json("file already exists")
            }

            let newfile = await Image({fieldname, originalname , mimetype , destination, filename , path
            });
            newfile.save();
            res.status(200).json({msg:"file uploaded successfully"})
            
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    fileDelete:async (req,res) =>{
        try {
            // res.json({msg:"file delete Works"})
             Image.findById({_id: req.params.id},(err,data) =>{
                if(err) throw err;
                fs.unlinkSync(data.path);
            })
            await Image.findByIdAndDelete(req.params.id);
            res.status(200).json({msg :"file deleted successfully"})
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    }
}
module.exports = ImageCtrl