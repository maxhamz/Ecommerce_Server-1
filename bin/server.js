const app = require('../app.js');
const http = require('http');
const server = http.createServer(app);
app.io.attach(server);
const PORT = process.env.PORT || 3100;

server.listen(PORT, () => {
    console.log(`LISTENING TO: ${PORT}`);
});