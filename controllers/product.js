const {Product} = require('../models')
const {customError} = require('../helpers/customError')
const {defaultPic} = require('../helpers/defaultPic')
const {post2Imgur} = require('../helpers/tesimgur')
let pic
class ProductController {

    static createProduct(req, res, next) {

        console.log(">>> CONTROLLERS: CREATE PRODUCT");
        const {name, description, category, image_url, price, stock} = req.body
        console.log(req.body);
        // console.log(req.body);
        // console.log(req.headers);
        // console.log(req.body);

        if(!image_url) {
            pic = defaultPic(category)
        } else {
            pic = image_url
        }

        return post2Imgur(pic)
            .then(response => {
                console.log("WHASSAP BLIMPO?");
                console.log(response);

                if(!(response instanceof Error)) {
                    return Product.create({
                        name: name,
                        description: description,
                        category: category,
                        image_url: response,
                        price: price,
                        stock: stock
                    })
                } else {
                    throw new customError(400, 'IMAGE UPLOAD FAILED')
                }

                
            })
            .then(response => {
                // console.log("PRODUCT ADDED TO INVENTORY");
                // console.log(response);
                return res.status(201).json(response)
            })
            .catch(err => {
                return next(err)
            })

    }


    static getAllProducts(req, res, next) {

        // console.log(">>> CONTROLLERS: GET ALL PRODUCTS");
        return Product.findAll()
            .then(response => {
                // console.log("FETCHED ALL PRODUCTS");
                // console.log(response);
                return res.status(200).json({data: response})
            })
            .catch(err => {
                return next(err)
            })
    }


    static getOneProduct(req, res, next) {

        // console.log(">>> CONTROLLERS: GETTING ONE PRODUCT BY ID");
        return Product.findByPk(Number(req.params.id))
            .then(response => {

                if(response) {
                    // console.log("PRODUCT FOUND");
                    // console.log(response.dataValues);
                    return res.status(200).json(response)
                } else {
                    throw new customError(404, 'NOT FOUND')
                }
                
            })
            .catch(err => {
                return next(err)
            })

    }


    static editProduct(req, res, next) {
        // console.log(">>> CONTROLLERS: EDIT PRODUCT");
        // console.log(req.body);
        // console.log(req.params.id);

        const {name, description, category, image_url, price, stock} = req.body

        return Product.findOne({
            where: {
                id: Number(req.params.id)
            }
        })
        .then(response => {
            if(response) {
                // console.log("PRODUCT FOUND");

                if(!image_url) {
                    pic = defaultPic(category)
                } else {
                    pic = image_url
                }

                let imguregex = /imgur/gi
                let imgurd = pic.match(imguregex)

                console.log(imgurd);

                if(!imgurd) {
                    return post2Imgur(pic)
                } else {
                    return pic
                }
                
    
            }
        })
        .then(response => {
                // console.log("WHASSAP BLIMPO?");
                // console.log(response);

                if(!(response instanceof Error)) {
                    return Product.update({
                        name: name,
                        description: description,
                        category: category,
                        image_url: response,
                        price: price,
                        stock: stock
                    }, {
                        where: {
                            id: req.params.id
                        },
                        returning: true
                    })
                } else {
                    throw new customError(400, 'IMAGE UPLOAD FAILED')
                }

                
            })
        .then(response => {
            // console.log("PRODUCT UPDATED");
            return res.status(200).json(response[1][0])
        })
        .catch(err => {
            return next(err)
        })

    }


    static dropProduct(req, res, next) {
        // console.log(">>> DELETING PRODUCT");
        // console.log(req.params.id);
        return Product.findOne({
            where: {
                id: Number(req.params.id)
            }
        })
        .then(response => {
            // console.log("WHAT'S RESPONSE?");
            // console.log(response);
            if(response) {
                // console.log("PRODUCT FOUND");
                return Product.destroy({
                    where: {
                        id: response.id
                    }
                })

            } else {
                throw new customError(404, 'NOT FOUND')
            }
        })
        .then(_ => {
            return res.status(200).json({message: 'PRODUCT DROPPED FROM INVENTORY'})
        })
        .catch(err => {
            return next(err)
        })

    }

}

module.exports = ProductController