const app = require('../app.js')
const request = require('supertest')
const testInput = {
    email: 'test@mail.com',
    password: 'xixixi',
    role: 'admin'
}

describe('User service', () => {
    describe('success register', () => {
        describe('POST /users/register', () => {
            test('should return status 201 with object of id & email', (done) => {
                request(app)
                    .post('/users/register')
                    .send(testInput)
                    .end((error, response) => {
                        if(error) {
                            return done(error)
                        } else {
                            console.log(">> TEST: SANITY CHECK");
                            console.log(response.body);
                            console.log(response.status);
                            expect(response.status.toBe(201))
                            expect(response.body.toHaveProperty('id', expect.any(Number)))
                            expect(response.body.toHaveProperty('email', testInput.email))
                            expect(response.body.toHaveProperty('role', expect('admin')))
                            expect(response.body.not.toHaveProperty('password'))
                            return done()
                        }
                    })
            })
        })
    })
})