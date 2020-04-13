const { Sequelize } = require('../models')

module.exports = (err, req, res, next) => {
    // console.log("MASUK ERROR HANDLER --->");
    // console.log(err);

    if(err instanceof Sequelize.ValidationError) {
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
    else if (err.name ===  'TokenExpiredError') {
        res.status(401).json({
            errors: [err.message]
        })
    } 
    else if (err.name ===  'JsonWebTokenError') {
        res.status(400).json({
            errors: [err.message]
        })
    } 
    else {
        res.status(500).json({
            errors: ['INTERNAL SERVER ERROR']
        })
    }

}