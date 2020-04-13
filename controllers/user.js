const {User} = require('../models')
const {customError} = require('../helpers/customError')
const {checkPassword} = require('../helpers/bcrypt')
const {createToken} = require('../helpers/jwt')
let payload
let token

class UserController {

    static register(req, res, next) {
        // console.log(">>> CONTROLLERS - USER - REGISTER");
        // console.log(req.body);
        const {email, password, role} = req.body
        return User.create({email, password, role})
            .then(response => {
                // console.log("USER CREATED");
                payload = {
                    id: response.id,
                    email: response.email,
                    role: response.role
                }
                return res.status(201).json(payload)
            })
            .catch(err => {
                return next(err)
            })
    }


    static login(req, res, next) {
        const {email, password} = req.body
        // console.log(req.body);
        return User.findOne({
            where: {
                email: email
            }
        })
        .then(response => {
            if(response) {
                // console.log("USER FOUND");
                let flag = checkPassword(password, response.password)
                if(flag) {
                    // console.log("LOGIN SUCCESS");
                    token = createToken({
                        id: response.id,
                        email: response.email,
                        role: response.role
                    })
                    res.status(200).json({access_token: token})
                } else {
                    throw new customError(400, 'WRONG PASSWORD/EMAIL')
                }
            } else {
                throw new customError(400, 'WRONG PASSWORD/EMAIL')
            }
        })
        .catch(err => {
            return next(err)
        })
    }

}

module.exports = UserController