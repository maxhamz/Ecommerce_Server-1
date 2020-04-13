const productRoutes = require('express').Router()
const ProductController = require('../controllers/product')
const {authentication} = require('../middleware/authentication')
const {authorization} = require('../middleware/authorization')

productRoutes.use(authentication)
productRoutes.post('/', ProductController.createProduct)
productRoutes.get('/', ProductController.getAllProducts)
productRoutes.get('/:id', ProductController.getOneProduct)
productRoutes.put('/:id', authorization, ProductController.editProduct)
productRoutes.delete('/:id', authorization, ProductController.dropProduct)

module.exports = productRoutes