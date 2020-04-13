const bcrypt = require('bcryptjs')
const SALT = bcrypt.genSaltSync(10)

function hashPassword(inputted) {
    return bcrypt.hashSync(inputted, SALT)
}

function checkPassword(inputted, stored) {
    return bcrypt.compareSync(inputted, stored)
}

module.exports = {
    hashPassword, checkPassword
}