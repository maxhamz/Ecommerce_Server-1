const app = require('../app.js')
const {
    User
} = require('../models')
const request = require('supertest')
const testInput = {
    email: 'test@mail.com',
    password: 'xixixi',
    role: 'admin'
}
let wrongInput = {}
let errors = []

afterAll((done) => {
    User.destroy({
            where: {
                email: testInput.email
            }
        })
        .then(_ => {
            done()
        })
})

describe('User service', () => {

    // USER REGISTER SUCCESS
    describe('success register', () => {
        describe('POST /users/register', () => {
            // SUCCESS REGISTER
            test('should return status 201 with object of id, email & role', (done) => {
                request(app)
                    .post('/users/register')
                    .send(testInput)
                    .end((error, response) => {
                        if (error) {
                            return done(error)
                        } else {

                            expect(response.status).toBe(201)

                            expect(response.body).toHaveProperty('id', expect.any(Number))
                            expect(response.body).toHaveProperty('email', testInput.email)
                            expect(response.body).toHaveProperty('role', testInput.role)
                            expect(response.body).not.toHaveProperty('password')

                            return done()
                        }
                    })
            })

        })
    })


    // USER REGISTER ERROR
    describe('error register', () => {

        describe('POST /users/register', () => {

            test('should return error 400 because of duplicate email', (done) => {
                errors = ['EMAIL TAKEN']
                request(app)
                    .post('/users/register')
                    .send(testInput)
                    .end((error, response) => {
                        if (error) {
                            return done(error)
                        } else {
                            expect(response.status).toBe(400)
                            expect(response.body).toHaveProperty('errors', errors)

                            return done()
                        }
                    })
            })

            test('should return error 400 because of wrong email, password, & role formats', (done) => {
                errors = [
                    'PLEASE ENTER VALID EMAIL FORMAT',
                    'PASSWORD MUST BE AT LEAST 6 CHARACTERS',
                    'MUST BE USER OR ADMIN'
                ]
                wrongInput = {
                    email: 'testmail.com',
                    password: 'xixi',
                    role: 'mimin'
                }
                request(app)
                    .post('/users/register')
                    .send(wrongInput)
                    .end((error, response) => {
                        if (error) {
                            return done(error)
                        } else {
                            console.log(response.body);
                            expect(response.status).toBe(400)
                            expect(response.body).toHaveProperty('errors', errors)

                            return done()
                        }
                    })
            })

        })

    })




    // USER LOGIN SUCCESS
    describe('success login', () => {
        describe('POST /users/login', () => {
            // SUCCESS LOGIN
            test('should return status 200 with object of access_token', (done) => {
                const testLogin = {
                    email: testInput.email,
                    password: testInput.password
                }
                request(app)
                    .post('/users/login')
                    .send(testLogin)
                    .end((error, response) => {
                        if (error) {
                            return done(error)
                        } else {

                            expect(response.status).toBe(200)

                            expect(response.body).toHaveProperty('access_token', expect.any(String))

                            return done()
                        }
                    })
            })

        })
    })


     // USER LOGIN ERROR
     describe('error login', () => {

        describe('POST /users/login', () => {

            test('should return error 400 because of wrong email & password', (done) => {
                errors = ['WRONG PASSWORD/EMAIL']
                wrongInput = {
                    email: 'test1@mail.com',
                    password: 'hahaha'
                }
                request(app)
                    .post('/users/login')
                    .send(wrongInput)
                    .end((error, response) => {
                        if(error) {
                            return done(error)
                        } else {
                            expect(response.status).toBe(400)
                            expect(response.body).toHaveProperty('errors', errors)

                            return done()
                        }
                    })
            })


        })

    })



})