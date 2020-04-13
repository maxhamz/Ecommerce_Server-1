const userRoutes = require('express').Router()
const UserController = require('../controllers/user')

userRoutes.post('/register', UserController.register)

module.exports = userRoutes