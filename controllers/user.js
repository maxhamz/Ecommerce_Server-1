const {User} = require('../models')

let payload
let token

class UserController {

    static register(req, res, next) {
        console.log(">>> CONTROLLERS - USER - REGISTER");
        console.log(req.body);
        const {email, password, role} = req.body
        User.create({email, password, role})
            .then(response => {
                console.log("USER CREATED");
                payload = {
                    id: response.id,
                    email: response.email,
                    role: response.role
                }
                res.status(201).json(payload)
            })
            .catch(err => {
                console.error(err)
                next(err)
            })
    }

}

module.exports = UserController