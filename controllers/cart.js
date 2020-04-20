const {
    Cart,
    Order,
    User,
    Product
} = require('../models')
const {
    customError
} = require("../helpers/customError")
let inputParams
let cart
let itemId
let UserId
let disthrow
let item


class CartController {

    static createCart(req, res, next) {
        console.log(">>> CONTROLLERS: CREATE CART \n");
        UserId = req.decoded.id
        itemId = req.body.ProductId

        inputParams = {
            UserId: UserId,
            ProductId: itemId,
            total_qty: 1
        }

        Cart.findOne({
                where: {
                    UserId: UserId,
                    ProductId: itemId
                }
            })
            .then(response => {
                console.log("CART IS");

                // console.log(response);
                if (response) {
                    cart = response.dataValues
                    console.log("HAVE CART ALREADY!");
                    // let disthrow =  new customError(400, "ACTIVE CART EXISTED. TRY TO UPDATE INSTEAD.")
                    // // next({status: 400, message: "CART EXISTED. TRY TO UPDATE INSTEAD."})
                    // next(disthrow)
                    if (cart) {
                        return Cart.update({
                            total_qty: sequelize.literal('total_qty + 1')
                        }, {
                            where: {
                                id: cart.id
                            },
                            include: ['Product', 'User'],
                            returning: true
                        })
                    } else {
                        throw new customError(404, 'NOT FOUND')
                    }


                } else {
                    console.log("NOT YET! LET'S CREATE NEW ONE");
                    return Cart.create(inputParams)
                }
            })
            .then(response => {
                console.log("ADDED ITEM TO CART")
                res.status(201).json(response)
            })
            .catch(err => {
                next(err)
            })
    }


    static getAllCarts(req, res, next) {
        console.log("SHOWING ALL CARTS");
        console.log("WHO'S USER");
        console.log(req.decoded.id);
        Cart.findAll({
                where: {
                    UserId: req.decoded.id
                },
                order: [
                    ['updatedAt', 'DESC']
                ],
                include: ['Product', 'User']
            })
            .then(response => {
                console.log("CARTS RETRIEVED");
                // console.log(response);
                res.status(200).json({
                    response
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static getAllOrders(req, res, next) {
        console.log("SHOWING COMPLETED ORDERS");
        console.log("WHO'S USER");
        console.log(req.decoded.id);
        Order.findAll({
                where: {
                    UserId: req.decoded.id
                },
                order: [
                    ['updatedAt', 'DESC']
                ],
                include: ['Product', 'User']
            })
            .then(response => {
                console.log("ORDERS RETRIEVED");
                console.log(response);
                res.status(200).json({
                    response
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static addQty(req, res, next) {
        console.log(">>> CONTROLLERS: ADD ITEM TO CART \n");
        Cart.update({
                total_qty: sequelize.literal('total_qty + 1')
            }, {
                where: {
                    id: req.params.cartId
                },
                include: ['Product', 'User'],
                returning: true
            })
            .then(response => {
                console.log("WHAT'S RESPONSE?");
                // console.log(response);
                if (response[0] !== 0) {
                    console.log("CART UPDATED: QTY ADD");
                    let updated = response[1]
                    res.status(201).json({
                        updated
                    })
                } else {
                    //  disthrow =  new customError(404, "ENTRY NOT FOUND")
                    // // next({status: 400, message: "CART EXISTED. TRY TO UPDATE INSTEAD."})
                    // next(disthrow)
                    throw new customError(404, 'NOT FOUND')
                }

            })
            .catch(err => {
                console.log("ERROR ADDING QTY");
                next(err)
            })
    }

    static reduceQty(req, res, next) {
        console.log(">>> CONTROLLERS: REMOVE ONE ITEM FROM CART \n");

        // CHECK IF CART QTY IS ONE. IF SO, JUST DELETE CART
        Cart.findOne({
                where: {
                    id: req.params.cartId
                }
            })
            .then(response => {
                console.log("ONE LEFT?");
                // console.log(response);
                if (response) {
                    if (response.total_qty === 1) {
                        return Cart.destroy({
                            where: {
                                id: req.params.cartId
                            }
                        })
                    } else {
                        console.log("NAH! STILL HAVE SOME SUPPLY!");
                        return Cart.update({
                            total_qty: sequelize.literal('total_qty - 1')
                        }, {
                            where: {
                                id: req.params.cartId
                            },
                            include: ['Product', 'User'],
                            returning: true
                        })
                    }
                } else {
                    throw new customError(404, 'NOT FOUND')
                }

            })
            // Cart.update({
            //         total_qty: sequelize.literal('total_qty - 1')
            //     }, {
            //         where: {
            //             id: req.params.cartId
            //         },
            //         include: ['Product', 'User'],
            //         returning: true
            //     })
            .then(response => {
                console.log("CART UPDATED: QTY REDUCED");
                return res.status(201).json(response[1])
            })
            .catch(err => {
                console.log("ERROR ADDING QTY");
                return next(err)
            })
    }

    static deleteCart(req, res, next) {
        console.log(">>> CONTROLLERS: DELETING CART \n");

        Cart.destroy({
                where: {
                    id: +req.params.cartId
                }
            })
            .then(response => {
                console.log("DELETE CART SUCCESS");
                if (response === 1) {
                    res.status(200).json({
                        data: response,
                        message: "Delete Success"
                    })
                } else {
                    console.log("CART NOT FOUND TO DELETE");
                    throw new customError(404, "NOT FOUND")
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static checkout(req, res, next) {
        console.log("CHECKING OUT CART EN MASSE \n");
        let cart
        let carts
        let updated_product
        let promises = []
        let ordersCreated = []

        return Cart.findAll({
                where: {
                    UserId: req.decoded.id
                },
                include: ['Product', 'User']
            })
            .then(response => {
                console.log("FIRST OFF: WHAT IS RESPONSE?");
                console.log(response);
                if (response.length > 0) {
                    console.log("RETRIEVED ALL CARTS");
                    carts = response

                    // USE REGULAR FOR LOOP TO FIND & RESOLVE PRODUCT IN EACH CART
                    for(var i = 0; i < carts.length; i++) {
                        let currentCart = carts[i]

                        console.log(`FOR CART ${currentCart.id}, WE ARE WORKING ON PRODUCT ID ${currentCart.ProductId}`)
                        
                        const promise = new Promise((resolve, reject) => {
                            return Product.findOne({
                                where: {
                                    id: currentCart.ProductId
                                }
                            })
                            .then(product => {
                                console.log("WHAT'S PRODUCT?");
                                if(product) {
                                    console.log("FOUND'EM")
                                    if (product.stock >= currentCart.total_qty) {
                                        console.log("STOCKS ARE STILL PLENTIFUL")
                                        product.stock = Number(product.stock) - Number(currentCart.total_qty)
                                        return resolve(product)
                                    } else {
                                        console.log("INSUFFICIENT STOCK")
                                        disthrow = new customError(400, 'INSUFFICIENT STOCK')
                                        return reject(disthrow)
                                    }
                                } else {
                                    console.log("PRODUCT NOT FOUND")
                                    disthrow = new customError(404, 'NOT FOUND')
                                    return reject(disthrow)
                                }
                            })
                            .catch(err => {
                                return reject(err)
                            })
                        })

                        //ENND PROMISE CONST
                        promises.push(promise)
                    }

                    return Promise.all(promises)

                } else {
                    throw new customError(404, 'NOT FOUND')
                }

            })
            .then(responses => {

                console.log("NOW BEGIN UPDATING STOCK");
                updated_product = responses

                let updatepromises = []

                for(var i = 0; i < responses.length; i++) {
                    item = responses[i]
                    console.log("ENTERING PROMISE OF PRODUCT?");
                    const updprom = new Promise((resolve, reject) => {
                        console.log("NOW REALLY UPDATING PRODUCTS");
                        return Product.update({
                                name: item.name,
                                category: item.category,
                                image_url: item.image_url,
                                price: item.price,
                                stock: item.stock
                            }, {
                                where: {
                                    id: item.id
                                },
                                // attributes: { exclude: ['CartId'] },
                                returning: true
                            })
                            .then(updd => {
                                console.log("PRODUCT UPDATED");
                                console.log(updd[1]);
                                return resolve(updd)
                            })
                            .catch(err => {
                                return reject(err)
                            })
                    })
                    updatepromises.push(updprom)

                }

                return Promise.all(updatepromises)

            })
            .then(_ => {

                console.log("NOW, CREATING ORDER FROM THE CARTS");

                let orderproms = []

                for(var i = 0; i < carts.length; i++) {
                    cart = carts[i]
                    const orderprom = new Promise((resolve, reject) => {
                        Order.create({
                            UserId: cart.UserId,
                            ProductId: cart.ProductId,
                            total_qty: cart.total_qty,
                            total_price: Number(cart.total_qty) * Number(updated_product[i]['price'])
                        })
                            .then(response => {
                                console.log("ORDER CREATED");
                                resolve(response)
                            })
                            .catch(err => {
                                console.log("ERROR UPDATING");
                                reject(err)
                            })
                    })

                    orderproms.push(orderprom)

                }

                return Promise.all(orderproms)
            })
            .then(responses => {
                console.log("NOW DESTROYING USER'S CART");
                ordersCreated = responses
                return Cart.destroy({
                    where: {
                        id: req.decoded.id
                    }
                })

            })
            .then(_ => {
                console.log("CARTS CHECKDOUT. PRODUCTS' STOCKS UPDATED. ORDERS CREATED");
                return res.status(201).json(ordersCreated)
            })
            .catch(err => {
                return next(err)
            })
    }


}

module.exports = CartController