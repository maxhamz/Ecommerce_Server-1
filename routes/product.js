const productRoutes = require('express').Router()
const ProductController = require('../controllers/product')
const {authentication} = require('../middleware/authentication')
const {authorization} = require('../middleware/authorization')

// MULTER SETTINGS
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cbDest) => {
        cbDest(null, 'photos/')
    },
    filename: (req, file, cbFileName) => {
        let oriname = file.originalname
        let createdAt = new Date().toISOString()
        let fotoname = createdAt+'_'+oriname
        cbFileName(null, fotoname)
    }
})

const fileFilter = (req, file, cbFilter)  => {

    let crit1 = file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' || file.mimetype === 'image/svg'

    // ONLY ACCEPTS JPG, PNG OR SVG FILES
    if(crit1) {
        cbFilter(null, true)
    } else {
        cbFilter(null, false)
    }

}

const upload = multer({
    storage: storage, 
    limits: {
        // LIMITS FILE SIZE TO 10 MB
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
}) 

// // MULTER IMGUR SETTING
// const ImgurStorage = require('multer-storage-imgur');
// const upload       = multer({
//     storage: ImgurStorage({ clientId: '390277fdd42f174' })
//   })

//PLAIN MULTER
// const upload = multer({})

productRoutes.use(authentication)
productRoutes.post('/', ProductController.createProduct)
productRoutes.post('/multer', upload.single('imageSrc'), ProductController.createProduct2)
productRoutes.get('/', ProductController.getAllProducts)
productRoutes.get('/:id', ProductController.getOneProduct)
productRoutes.put('/:id', authorization, ProductController.editProduct)
productRoutes.delete('/:id', authorization, ProductController.dropProduct)

module.exports = productRoutes