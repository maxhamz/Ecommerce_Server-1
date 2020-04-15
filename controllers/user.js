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
        let defRole
        const {email, password, role} = req.body
        if(!role) {
            defRole = 'user'
        } else {
            defRole = role
        }
        return User.create({
            email: email,
            password: password, 
            role: defRole
        })
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
                    res.status(200).json({
                        access_token: token,
                        id: response.id,
                        email: response.email
                    })
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

    static fetchAll(req, res, next) {
        console.log("FETCHING ALL");
        User.findAll()
            .then(response => {
                console.log("ALL USERS FETCHED");
                res.status(200).json({data: response})
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = UserController