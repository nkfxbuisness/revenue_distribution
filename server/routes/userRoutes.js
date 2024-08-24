const express = require('express')
const { activateAccount, changePassword, reActiveAccount } = require('../controllers/userControllers')
const { authenticate, authorizeRoles } = require('../middleware/accessablityMidddleWare')
const Router = express.Router()

Router.post('/activateAccount/:id',authenticate, authorizeRoles(['user']),activateAccount)
// Router.post('/changePassword/:id',authenticate, authorizeRoles(['user']),changePassword)
Router.put('/reactivateAccount/:id',authenticate, authorizeRoles(['user']),reActiveAccount)


module.exports = Router