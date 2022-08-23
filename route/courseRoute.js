const route = require('express').Router();
const courseCtrl = require('../controller/courseCtrl')
const upload = require("../middlerware/course")

route.get(`/course` , courseCtrl.getAll);
route.post(`/course` ,upload, courseCtrl.create);
route.put(`/course/:id` ,upload,courseCtrl.update)
route.delete(`/course/:id` , courseCtrl.delete)

module.exports = route