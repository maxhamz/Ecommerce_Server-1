const express = require("express");
const app = express();
// app.io = require('socket.io');
app.io = require('socket.io')();

const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/index.js')(app.io);
const errorHandler = require('./middleware/errorHandler.js');

app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
// app.use( routes)(app.io);
app.use(routes)
app.use(errorHandler);

module.exports = app


