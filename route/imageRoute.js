const route = require('express').Router();
const ImageCtrl = require('../controller/imageCtrl')
const upload = require('../middlerware/upload')

route.get(`/file/read` , ImageCtrl.fileRead);
route.post(`/file/upload`,upload , ImageCtrl.fileUpload);
route.delete(`/file/:id` , ImageCtrl.fileDelete);

module.exports = route;



