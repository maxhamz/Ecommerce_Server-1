const { Sequelize } = require('../models')
const jwt = require('jsonwebtoken')

module.exports = (err, req, res, next) => {
    // console.log("MASUK ERROR HANDLER --->");
    // console.log(err);
    // console.log("the name is");
    // console.log(err.name);
    // console.log(err instanceof jwt.JsonWebTokenError);
    // console.log(err.message);

    if(err instanceof jwt.JsonWebTokenError || 
        err instanceof jwt.TokenExpiredError) {
        // console.log("MASUUUK SINI");
        res.status(400).json({errors: [err.message]})
    }
    else if(err instanceof Sequelize.ValidationError) {
        let arr = []

        err.errors.forEach(el => {
            arr.push(el.message)
        })

        res.status(400).json({
            errors: arr
        })

    }
    else if (err instanceof Sequelize.UniqueConstraintError) {
        res.status(400).json({
            errors: [err.errors.message]
        })
    }
    else if (err instanceof Error) {
        res.status(err.code).json({
            errors: [err.message]
        })
    }
    else {
        res.status(err.status || 500).json({
            errors: [err.message] || ['INTERNAL SERVER ERROR']
        })
    }

}