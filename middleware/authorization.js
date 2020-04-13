const {checkToken} = require('../helpers/jwt')
const {User} = require('../models')
const {customError} = require("../helpers/customError.js")
function authorization(req, res, next) {
    // console.log(">>> AUTHORIZATION");
    let token = req.headers.access_token
    let payload = checkToken(token)

    User.findOne({
        where: {
            id: payload.id
        }
    })
    .then(response => {
        if(response.role === 'admin') {
            // console.log("PASSED AUTHORIZATION");
            return next()
        } else {
            throw new customError(401, 'UNAUTHORIZED')
        }
    })
    .catch(err => {
        next(err)
    })


}

module.exports = {authorization}