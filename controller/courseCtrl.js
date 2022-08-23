const Course = require("../model/courseModel")
const fs = require("fs")
const courseCtrl = {
    getAll: async(req,res)=>{
        try {
            // res.json({data:"get all works"})
            const data = await Course.find();
            res.json({
                length:data.length,
                course:data
            })
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    create: async(req,res)=>{
        try {
            // res.json({data:"create works"})
            const {title, fee , duration, content} = req.body;
            const {fieldname, originalname, mimetype, destination, filename, path} = req.body.image;
            


            const newCourse = await Course({
                title,
                fee,
                duration,
                content
                // image:{
                //     fieldname, originalname, mimetype, destination, filename, path
                // }
            });

            res.json({data: newCourse})
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    update: async(req,res)=>{
        try {
            // res.json({data:"update works"})
            const {title, fee , duration, content} = req.body;
            const {fieldname, originalname, mimetype, destination, filename, path} = req.file;

            await Course.findByIdAndUpdate({_id:req.params.id}, {
                title,fee,duration,content,
                image:{
                    fieldname, originalname, mimetype, destination, filename, path
                }
            });
            res.json({msg:"course updated successfully"})

        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    delete: async(req,res)=>{
        try {
            // res.json({data:"Delete works"})
             Course.findById({_id:req.params.id} , (err,data)=>{
                if(err) throw err;
                 fs.unlinkSync(data.image.path)
            });
            await Course.findByIdAndDelete({_id:req.params.id});
            res.status(200).json({msg:"course deleted successfully"})
           
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
}
module.exports = courseCtrl