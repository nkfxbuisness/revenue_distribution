const express = require('express')
const Router = express.Router()
const {userLogin,userSignup, adminSignup, adminLogin} =require('../controllers/authControllers')

Router.post('/user/login',userLogin)
Router.post('/user/signup',userSignup)
Router.post('/admin/signup',adminSignup)
Router.post('/admin/login',adminLogin)

module.exports = Router