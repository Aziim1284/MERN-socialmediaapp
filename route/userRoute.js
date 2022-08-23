const route = require('express').Router();
const userCtrl = require('../controller/userCtrl')
const userMiddleware = require('../middlerware/user')

route.post('/register', userCtrl.register)
route.post('/login' , userCtrl.login)
route.get('/logout' , userCtrl.logout)
route.get('/userInfo' ,userMiddleware, userCtrl.getUser)
route.get('/refreshToken' , userCtrl.refreshToken)

module.exports = route;