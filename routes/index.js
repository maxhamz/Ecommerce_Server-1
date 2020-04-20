const router = require('express').Router()
const userRoutes = require('./user')
const productRoutes = require('./product')
const cartRoutes = require('./cart')
const orderRoutes = require('./order')

router.get('/', (req, res, next) => {
    res.json({message: 'test'})
})

router.use('/users', userRoutes)
router.use('/products', productRoutes)
router.use('/carts', cartRoutes)
router.use('/orders', orderRoutes)

module.exports = function(io) {

    io.on('connection', (socket) => {
        console.log('User has connected to Index');

        //REGISTER
        socket.on('registered', (payload) => {
            console.log("SERVER SEZ: WELCOME, NEW USER!");
            console.log(payload.data);
        })

        //LOGIN
        socket.on('loggedin', (payload) => {
            console.log("SERVER SEZ: WELCOME BACK, USER!");
            console.log(payload.data);
            io.emit('loggedin2', payload.data.email)
            
        })


        //LOGOUT
        socket.on('loggedout', (payload) => {
            console.log("SERVER SEZ:");
            console.log(payload);
            io.emit('loggedout2', payload)
        })


        //FETCH PRODUCTS
        socket.on('getProducts', (payload) => {
            console.log("PRODUCTS UPLOADED");
            
            io.emit('getProducts2', payload)
        })

        


        // NEW PRODUCT
        socket.on("new_product", (payload) => {
            console.log(">>>> PRODUCT FROM OVEN!");
            console.log(payload);
            io.emit('added_product', payload)
        });


        // UPDATE PRODUCT
        socket.on('product_update', (payload) => {
            console.log(`PRODUCT ${payload.title} HAS BEEN UPDATED`);
            io.emit('updated_product', payload)
        })


        // DELETED PRODUCT
        socket.on("product_deleted", (payload) => {
            console.log(">>>> PRODUCT DELETED!");
            console.log(payload);
            io.emit('deleted_product', 'PRODUCT DELETED')
        });



        //End ON Events
        socket.on('disconnect', () => {
            console.log("SERVER SEZ: UNTIL NEXT TIME!");
        })


    })

    return router
}