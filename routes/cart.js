const cartRoutes = require('express').Router()
const CartController = require('../controllers/cart')
const {authentication} = require('../middleware/authentication')
const {user_auth} = require('../middleware/user-auth')

cartRoutes.use(authentication)
cartRoutes.get('/', CartController.getAllCarts)
cartRoutes.get('/orders', CartController.getAllOrders)

cartRoutes.use(user_auth)
cartRoutes.post('/', CartController.createCart)
cartRoutes.patch("/add/:cartId", CartController.addQty)
cartRoutes.patch("/remove/:cartId", CartController.reduceQty)
cartRoutes.delete("/:cartId", CartController.deleteCart)
cartRoutes.patch("/checkout", CartController.checkout)

module.exports = cartRoutes