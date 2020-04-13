const userRoutes = require('express').Router()
const UserController = require('../controllers/user')

userRoutes.post('/register', UserController.register)
userRoutes.post('/login', UserController.login)

module.exports = userRoutes