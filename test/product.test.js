const app = require('../app.js')
const {
    User
} = require('../models')
const request = require('supertest')
const testUser = {
    email: 'test@mail.com',
    password: 'xixixi',
    role: 'admin'
}
let wrongInput = {}
let errors = []