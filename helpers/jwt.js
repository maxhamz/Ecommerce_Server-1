const jwt = require('jsonwebtoken')

function createToken(payload) {
    return jwt.sign(payload, "rahasiadong")
}

function checkToken(payload) {
    return jwt.verify(payload, 'rahasiadong')
}

module.exports = {
    createToken, checkToken
}