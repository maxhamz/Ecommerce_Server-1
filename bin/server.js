const env = process.env.NODE_ENV || 'development'

switch (env) {
  case 'development':
    require('dotenv').config({path: process.cwd() + '/.env'});
      break;
  case 'test':
    require('dotenv').config({path: process.cwd() + '/.env.test'});
      break;
}

const app = require('../app.js');
const http = require('http');
const server = http.createServer(app);
app.io.attach(server);
const PORT = process.env.PORT || 3100;

server.listen(PORT, () => {
    console.log(`LISTENING TO: ${PORT}`);
});