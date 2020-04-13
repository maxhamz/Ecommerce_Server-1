const jwt = require('jsonwebtoken')

function createToken(payload) {

    //FOR TEST
    // return jwt.sign(payload, "rahasiadong", { expiresIn: '1h' })

    //FOR DEVELOPMENT
    return jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })
}

function checkToken(payload) {

    //FOR TEST
    // return jwt.verify(payload, "rahasiadong")

    //FOR DEVELOPMENT
    return jwt.verify(payload, process.env.SECRET)
}

module.exports = {
    createToken, checkToken
}