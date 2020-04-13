const {checkToken} = require('../helpers/jwt')
const {User} = require('../models')
const {customError} = require("../helpers/customError.js")
function authentication(req, res, next) {
    // console.log(">>> AUTHENTICATION");
    let token = req.headers.access_token
    let payload = checkToken(token)

    User.findOne({
        where: {
            id: payload.id
        }
    })
    .then(response => {
        if(response.id === payload.id) {
            // console.log("PASSED AUTHENTICATION");
            req.decoded = payload
            return next()
        } else {
            throw new customError(401, 'UNAUTHORIZED')
        }
    })
    .catch(err => {
        next(err)
    })


}

module.exports = {authentication}