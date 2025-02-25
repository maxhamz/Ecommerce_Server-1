const app = require('../app.js')
const tesPropicPath = '/mnt/c/Users/sandbox/Documents/HACKTIV8/PHASE2R/obat_bebas_terbatas.jpg'
const {
    createToken
} = require('../helpers/jwt')
const {
    User,
    Product
} = require('../models')
const request = require('supertest')
const testUser = {
    email: 'sample@mail.com',
    password: 'hehehehe',
    role: 'admin'
}
let sampleProductId = 0
const testInput = {
    name: 'Panadol',
    description: 'paracetamol 20mg',
    category: 'otc',
    image_url: '/mnt/c/Users/sandbox/Documents/HACKTIV8/PHASE2R/obat_bebas.jpg',
    price: 5000,
    stock: 5000
}
let wrongInput = {}
let errors = []
let testToken

// BEFORE ALL BEGIN: LOGIN TEST USER
beforeAll((done) => {
    console.log(">>> REGISTERING & LOGIN SAMPLE USERS FOR PRODUCT.TEST");
    /*
        REGISTER TEST USER & LOGIN TEST USER CREDENTIALS 
     */
    return request(app)
        .post('/users/register')
        .send(testUser)
        .end((req, res) => {
            // console.log("RES BODY 4 REGISTER IS");
            // console.log(res.body);
            // console.log(res.headers);
            testToken = createToken({
                id: res.body.id,
                email: res.body.email,
                role: res.body.token
            })
            // console.log("this is token");
            // console.log(testToken);

            done()
        })
})


// AFTER ALL: DELETE USER CREDS
afterAll((done) => {
    return User.destroy({
            where: {
                email: testUser.email
            }
        })
        .then(_ => {
            return Product.destroy({
                where: {
                    id: sampleProductId
                }
            })
        })
        .then(_ => {
            return done()
        })
})


// REAL TESTING BEGIN
describe('Product services', () => {

    // PRODUCT CREATE SUCCESS
    describe('Success add product', () => {
        describe('POST /products ', () => {

            test('Should return status 201 with object of id, name, description, category, price & stock', (done) => {
                request(app)
                    .post('/products/')
                    .set({
                        access_token: testToken
                    })
                    .field("name", testInput.name)
                    .field("description", testInput.description)
                    .field("category", testInput.category)
                    .attach("imageSrc", testInput.image_url)
                    .field("price", 5000)
                    .field("stock", 5000)
                    .end((error, response) => {
                        if (error) {
                            return done(error)
                        } else {
                            // console.log("RESPONSE STATUS FOR ADD PRODUCT SUCCESS IS");
                            // console.log(response.status);
                            // console.log("RESPONSE BODY FOR ADD PRODUCT SUCCESS IS");
                            // console.log(response.body);

                            expect(response.status).toBe(201)

                            expect(response.body).toHaveProperty('id', expect.any(Number))
                            expect(response.body).toHaveProperty('name', testInput.name)
                            expect(response.body).toHaveProperty('description', testInput.description)
                            expect(response.body).toHaveProperty('category', testInput.category)
                            expect(response.body).toHaveProperty('image_url', expect.any(String))
                            expect(response.body).toHaveProperty('price', testInput.price)
                            expect(response.body).toHaveProperty('stock', testInput.stock)

                            sampleProductId = response.body.id

                            return done()
                        }
                    })
            })

        })
    })


    // PRODUCT CREATE ERROR
    describe('Error add product', () => {
        describe('POST /products ', () => {

            test('Should return status 400 because of invalid name, category, price & stock (negative numbers)', (done) => {
                wrongInput = {
                    name: null,
                    description: 'adadeh',
                    category: 'narkoba',
                    image_url: '/mnt/c/Users/sandbox/Documents/HACKTIV8/PHASE2R/obat_bebas_terbatas.jpg',
                    price: -2000,
                    stock: -2000
                }
                errors = [
                    // 'NAME REQUIRED',
                    'PLEASE ENTER VALID DRUG CATEGORY',
                    'PRICE MUST BE NON-NEGATIVE',
                    'STOCK MUST BE NON-NEGATIVE'
                ]
                request(app)
                    .post('/products/')
                    .set({
                        access_token: testToken
                    })
                    // .send(wrongInput)
                    .field("name", "")
                    .field("description", wrongInput.description)
                    .field("category", wrongInput.category)
                    .attach("imageSrc", tesPropicPath)
                    .field("price", wrongInput.price)
                    .field("stock", wrongInput.stock)
                    .end((error, response) => {
                        if (error) {
                            return done(error)
                        } else {

                            // console.log("RESPONSE STATUS FOR ADD PRODUCT ERROR IS");
                            // console.log(response.status);
                            // console.log("RESPONSE BODY FOR ADD PRODUCT ERROR IS");
                            // console.log(response.body);

                            expect(response.status).toBe(400)
                            expect(response.body).toHaveProperty('errors', errors)
                            // expect(response.body).toHaveProperty('errors', expect.any(Array))
                            return done()
                        }
                    })
            })

        })
    })


    // GET ALL PRODUCTS SUCCESS
    describe('Success get all product', () => {
        describe('GET /products ', () => {

            test('Should return status 200  with object of array of all mercs', (done) => {
                request(app)
                    .get('/products')
                    .set({
                        access_token: testToken
                    })
                    .end((error, response) => {
                        if (error) {
                            return done(error)
                        } else {

                            // console.log(response.status);
                            // console.log(response.body);

                            expect(response.status).toBe(200)

                            expect(response.body).toHaveProperty('data', expect.any(Array))

                            return done()
                        }
                    })
            })

        })
    })


    // GET ONE PRODUCT SUCCESS
    describe('Success get ONE product', () => {
        describe('GET /products/:id ', () => {

            test('Should return status 200  with object of id, name, description, category, price & stock', (done) => {
                request(app)
                    .get(`/products/${sampleProductId}`)
                    .set({
                        access_token: testToken
                    })
                    .end((error, response) => {
                        if (error) {
                            return done(error)
                        } else {

                            // console.log(response.status);
                            // console.log(response.body);

                            expect(response.status).toBe(200)

                            expect(response.body).toHaveProperty('id', expect.any(Number))
                            expect(response.body).toHaveProperty('name', testInput.name)
                            expect(response.body).toHaveProperty('description', testInput.description)
                            expect(response.body).toHaveProperty('category', testInput.category)
                            expect(response.body).toHaveProperty('image_url', expect.any(String))
                            expect(response.body).toHaveProperty('price', testInput.price)
                            expect(response.body).toHaveProperty('stock', testInput.stock)

                            return done()
                        }
                    })
            })

        })
    })


    // GET ONE PRODUCT FAIL
    describe('FAIL get ONE product', () => {
        describe('GET /products/:id ', () => {

            test('Should return error 404 because ID not found', (done) => {
                errors = ['NOT FOUND']
                request(app)
                    .get(`/products/${-100000000000}`)
                    .set({
                        access_token: testToken
                    })
                    .end((error, response) => {
                        if (error) {
                            return done(error)
                        } else {

                            // console.log(response.status);
                            // console.log(response.body);

                            expect(response.status).toBe(404)
                            expect(response.body).toHaveProperty('errors', errors)

                            return done()
                        }
                    })
            })

        })
    })


    // PRODUCT EDIT SUCCESS
    describe('Success edit product', () => {
        describe('PUT /products ', () => {

            test('Should return status 200 with UPDATED object of id, name, description, category, price & stock', (done) => {
                // TEST EDIT
                let testEdit = {
                    name: 'Codipront',
                    description: 'codein 40mg',
                    category: 'prescription',
                    image_url: '/mnt/c/Users/sandbox/Documents/HACKTIV8/PHASE2R/obat_bebas_terbatas.jpg',
                    price: 80000,
                    stock: 6000
                }

                request(app)
                    .put(`/products/${sampleProductId}`)
                    .set({
                        access_token: testToken
                    })
                    // .send(testEdit)
                    .field("name", testEdit.name)
                    .field("description", testEdit.description)
                    .field("category", testEdit.category)
                    .attach("imageSrc", testEdit.image_url)
                    .field("price", testEdit.price)
                    .field("stock", testEdit.stock)
                    .end((error, response) => {
                        if (error) {
                            return done(error)
                        } else {

                            console.log("RESPONSE STATUS FOR EDIT PRODUCT SUCCESS IS");
                            console.log(response.status);
                            console.log("RESPONSE BODY FOR EDIT PRODUCT SUCCESS IS");
                            console.log(response.body);

                            expect(response.status).toBe(200)

                            expect(response.body).toHaveProperty('id', expect.any(Number))
                            expect(response.body).toHaveProperty('name', testEdit.name)
                            expect(response.body).toHaveProperty('description', testEdit.description)
                            expect(response.body).toHaveProperty('category', testEdit.category)
                            expect(response.body).toHaveProperty('image_url', expect.any(String))
                            expect(response.body).toHaveProperty('price', testEdit.price)
                            expect(response.body).toHaveProperty('stock', testEdit.stock)

                            return done()
                        }
                    })
            })

        })
    })


    // PRODUCT EDIT FAIL
    describe('FAILED edit product', () => {
        describe('PUT /products ', () => {

            test('Should return error 400 because of wrong name, category, stock & price', (done) => {
                // TEST EDIT
                let wrongEdit = {
                    name: '',
                    description: 'codein 40mg',
                    category: 'narkoba',
                    image_url: '',
                    price: -80000,
                    stock: -6000
                }

                errors = [
                    // 'NAME REQUIRED',
                    'PLEASE ENTER VALID DRUG CATEGORY',
                    'PRICE MUST BE NON-NEGATIVE',
                    'STOCK MUST BE NON-NEGATIVE'
                ]

                request(app)
                    .put(`/products/${sampleProductId}`)
                    .set({
                        access_token: testToken
                    })
                    // .send(wrongEdit)
                    .field("name", wrongEdit.name)
                    .field("description", wrongEdit.description)
                    .field("category", wrongEdit.category)
                    .attach("imageSrc", wrongEdit.image_url)
                    .field("price", wrongEdit.price)
                    .field("stock", wrongEdit.stock)
                    .end((error, response) => {
                        if (error) {
                            return done(error)
                        } else {

                            console.log(response.status);
                            console.log(response.body);

                            expect(response.status).toBe(400)
                            // expect(response.body).toHaveProperty('errors', expect.any(Array))
                            expect(response.body).toHaveProperty('errors', errors)

                            return done()
                        }
                    })
            })

        })
    })



    // DELETE ONE PRODUCT SUCCESS
    describe('Success delete ONE product', () => {
        describe('DELETE /products/:id ', () => {

            test('Should return status 200  with object of id, name, description, category, price & stock', (done) => {
                // let msg = 'PRODUCT Panadol DROPPED FROM STORE INVENTORY'
                request(app)
                    .delete(`/products/${sampleProductId}`)
                    .set({
                        access_token: testToken
                    })
                    .end((error, response) => {
                        if (error) {
                            return done(error)
                        } else {

                            // console.log(response.status);
                            // console.log(response.body);

                            expect(response.status).toBe(200)
                            expect(response.body).toHaveProperty('message', expect.any(String))

                            return done()
                        }
                    })
            })

        })
    })


    // DELETE ONE PRODUCT FAIL
    describe('FAIL deleting ONE product', () => {
        describe('DELETE /products/:id ', () => {

            test('Should return error 404 because ID not found', (done) => {
                errors = ['NOT FOUND']
                request(app)
                    .delete(`/products/${-700000000000}`)
                    .set({
                        access_token: testToken
                    })
                    .end((error, response) => {
                        if (error) {
                            return done(error)
                        } else {

                            // console.log(response.status);
                            // console.log(response.body);

                            expect(response.status).toBe(404)
                            expect(response.body).toHaveProperty('errors', errors)

                            return done()
                        }
                    })
            })

        })
    })



})