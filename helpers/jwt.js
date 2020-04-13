const jwt = require('jsonwebtoken')

function createToken(payload) {
    return jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })
}

function checkToken(payload) {
    return jwt.verify(payload, process.env.SECRET)
}

module.exports = {
    createToken, checkToken
}