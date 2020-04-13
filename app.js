const express = require('express')
const app = express()

const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes/index.js')
const errorHandler = require('./middleware/errorHandler.js')

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(routes)
app.use(errorHandler)

module.exports = app


