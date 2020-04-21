const env = process.env.NODE_ENV 
console.log(process.env.NODE_ENV +  "INI ENV SKRG!")
switch (env) {
  case 'development':
    require('dotenv').config({path: process.cwd() + '/.env'});
      break;
  case 'test':
    console.log("MASUK INI TEST");
    require('dotenv').config({path: process.cwd() + '/.env.test'});
      break;
}


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

// TO DISPLAY STATIC FILES
// COMMENT OUT IF TESTING
// app.use('/static', express.static(path.join(__dirname, 'public')))

// app.use( routes)(app.io);
app.use(routes)
app.use(errorHandler);

module.exports = app


