const {User} = require('../models')
const {customError} = require('../helpers/customError')
const {checkPassword} = require('../helpers/bcrypt')
const {createToken} = require('../helpers/jwt')
const {
    OAuth2Client
} = require('google-auth-library')

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENTID);
let payload
let token
let emailAddress
let defRole = 'user'

class UserController {

    static register(req, res, next) {
        // console.log(">>> CONTROLLERS - USER - REGISTER");
        // console.log(req.body);
        defRole
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
        // console.log("FETCHING ALL");
        User.findAll()
            .then(response => {
                // console.log("ALL USERS FETCHED");
                res.status(200).json({data: response})
            })
            .catch(err => {
                next(err)
            })
    }


    static googleLogin(req, res, next) {
        // console.log("GOOGLE LOGIN @ CONTROLLERS");
        // console.log(req.headers)

        token = req.headers.access_token



        return googleClient.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENTID
            })
            .then(ticket => {
                // console.log("OK WHAT'S TICKET'S PAYLOAD?");
                // console.log(ticket);

                payload = ticket.getPayload();
                // console.log(payload);

                // // let userId = payload['sub']
                emailAddress = payload['email']

                // console.log("THIS IS USER GOOGLE EMAIL WE'RE GONNA FIND?");
                // console.log(emailAddress);

                return User.findOne({
                    where: {
                        email: emailAddress
                    }
                })


            })
            .then(response => {
                // console.log("WHAT'S VERDICT FOR FINDING USER?");
                // console.log(response);
                if (response) {
                    // console.log("THIS IS RETURNING USER");
                    return response
                } else {
                    // console.log("THIS IS NEW USER");
                    // console.log("THIS IS PROCESS ENV");
                    // console.log(process.env);
                    defRole = 'user'
                    return User.create({
                        email: emailAddress,
                        password: process.env.SECRET,
                        role: defRole
                    })
                }
            })
            .then(response => {

                payload = {
                    id: response.id,
                    email: response.email,
                    role: response.role
                }

                token = createToken(payload)

                return res.status(200).json({
                    access_token: token,
                    id: response.id,
                    email: response.email
                })
            })
            .catch(err => {
                return next(err)
            })
    }

}

module.exports = UserController