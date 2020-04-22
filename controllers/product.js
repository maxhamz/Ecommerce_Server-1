const {Product} = require('../models')
const {customError} = require('../helpers/customError')
const {defaultPic} = require('../helpers/defaultPic')
const {post2Imgur} = require('../helpers/tesimgur')
const imgur = require('imgur')
let fs = require('fs')
let pic
class ProductController {

    static createProduct(req, res, next) {

        // console.log(">>> CONTROLLERS: CREATE PRODUCT");
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

                if(response) {
                    return Product.create({
                        name: name,
                        description: description,
                        category: category,
                        image_url: response,
                        price: price,
                        stock: stock
                    })
                } else {
                    return Product.create({
                        name: name,
                        description: description,
                        category: category,
                        image_url: defaultPic(category),
                        price: price,
                        stock: stock
                    })
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


    static createProduct2 (req, res, next) {

        console.log(">>> CONTROLLERS: CREATE PRODUCT mMULTER");
        console.log("REQ BODY IS");
        console.log(req.body);
        console.log("REQ FILES IS");
        console.log(req.file);
        const imgSrc = req.file.path

        console.log("THE UPLOADED PATH IS");
        console.log(imgSrc);

        // TO UPLOAD 2 IMGUR, NEED TO CONVERT TO BASE-64 STRING FIRST
        // let b64d = fs.readFileSync(imgSrc, {encoding: 'base64'})

        // console.log("WHO IS B64 VERSION?");
        // console.log(b64d);
        // console.log('\n\n\n');

        // IMGUR TEST


        const {name, description, category, price, stock} = req.body
        const b64d = req.file.buffer.toString("base64")


        // if(!imgSrc) {
        //     pic = defaultPic(category)
        // } else {
        //     pic = b64d
        // }

        // return post2Imgur(b64d)
        return post2Imgur(imgurSrc)
            .then(response => {
                console.log("WHASSAP BLIMPO?");
                console.log(response);

                if(response) {
                    return Product.create({
                        name: name,
                        description: description,
                        category: category,
                        image_url: response,
                        price: price,
                        stock: stock
                    })
                } else {
                    return Product.create({
                        name: name,
                        description: description,
                        category: category,
                        image_url: defaultPic(category),
                        price: price,
                        stock: stock
                    })
                }

                
            })
            .then(response => {
                console.log("PRODUCT ADDED TO INVENTORY");
                // console.log(response);
                return res.status(201).json(response)
            })
            .catch(err => {
                return next(err)
            })


        // UPLOAD PAKE MULTER POLOS KE IMGUR
        // console.log(req.file.buffer.toString('base64'));
        // const encoded = req.file.buffer.toString('base64')

        // imgur.uploadBase64(encoded)
        //     .then(function (json) {
        //         console.log(json.data.link);
        //     })
        //     .catch(function (err) {
        //         console.error(err.message);
        //     });

    }


    static createProduct3 (req, res, next) {

        console.log(">>> CONTROLLERS: CREATE PRODUCT mMULTER");
        console.log("REQ BODY IS");
        console.log(req.body);
        console.log("REQ FILES IS");
        console.log(req.file);
        // const imgSrc = req.file.path

        // console.log("THE UPLOADED PATH IS");
        // console.log(imgSrc);

        // const {name, description, category, price, stock} = req.body
        


        // if(!imgSrc) {
        //     pic = defaultPic(category)
        // } else {
        //     pic = b64d
        // }

        // return post2Imgur(b64d)
        //     .then(response => {
        //         console.log("WHASSAP BLIMPO?");
        //         console.log(response);

        //         if(response) {
        //             return Product.create({
        //                 name: name,
        //                 description: description,
        //                 category: category,
        //                 image_url: response,
        //                 price: price,
        //                 stock: stock
        //             })
        //         } else {
        //             return Product.create({
        //                 name: name,
        //                 description: description,
        //                 category: category,
        //                 image_url: defaultPic(category),
        //                 price: price,
        //                 stock: stock
        //             })
        //         }

                
        //     })
        //     .then(response => {
        //         console.log("PRODUCT ADDED TO INVENTORY");
        //         // console.log(response);
        //         return res.status(201).json(response)
        //     })
        //     .catch(err => {
        //         return next(err)
        //     })

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