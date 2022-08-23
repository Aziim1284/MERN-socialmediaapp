            const express = require('express')
            const cors = require('cors')
            const cookieParser = require('cookie-parser')
            const mongoose = require('mongoose')
            const config = require('./db')
            const {createProxyMiddleware} = require('http-proxy-middleware')

            const PORT =5300;

            const app = express();
            app.use(express.json());
            app.use(express.urlencoded({extended:true}))

            app.use("/uploads",  express.static(__dirname+'/uploads'))
            app.use("/public",  express.static(__dirname+'/public'))


            //middle-ware

            app.use(cors())
            app.use(cookieParser())

            //mongodb config using js  promises
            mongoose.Promise = global.Promise;
            mongoose.connect(config.dbHOST , {useNewUrlParser: true} , (err) =>{
                if(err) throw err;
                console.log('mongodb connected')
            })

            //setting up  primary router
            app.use('/auth' , require('./route/userRoute'))
            app.use('/api' , require('./route/courseRoute'))
            app.use('/api' , require('./route/imageRoute'))


            //config the proxy middleware
            app.use('/auth' , createProxyMiddleware({target: "http://localhost:5300" , changeOrigin:true}))
            app.use('/api' , createProxyMiddleware({target: "http://localhost:5300" , changeOrigin:true}))


            app.all('**' , (req,res,next) =>{
                return res.status(400).json({msg:"requested path  ot found"});
                next()
            });
            //setting up default router
            app.listen(PORT,() =>{
                console.log(`server is up and running at port http://localhost:${PORT}`)
            })