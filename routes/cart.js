const cartRoutes = require('express').Router()
const CartController = require('../controllers/cart')
const {authentication} = require('../middleware/authentication')

cartRoutes.use(authentication)
cartRoutes.post('/', CartController.createCart)
cartRoutes.get('/', CartController.getAllCarts)
cartRoutes.get('/orders', CartController.getAllOrders)
cartRoutes.patch("/add/:cartId", CartController.addQty)
cartRoutes.patch("/remove/:cartId", CartController.reduceQty)
cartRoutes.delete("/:cartId", CartController.deleteCart)
cartRoutes.patch("/checkout", CartController.checkout)

module.exports = cartRoutes