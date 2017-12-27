const os = require('os');
const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

http.createServer(app().callback()).listen(PORT, HOST);

console.log(`You are using ${os.platform()}`);
console.log(`Application running on http://${HOST}:${PORT}`);



/*
require("./app")(PORT).then(resolve => {
    console.log(`App running on port: ${PORT}`);
});*/