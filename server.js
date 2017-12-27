const os = require('os');
const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 3000;

http.createServer(app().callback()).listen(PORT);

console.log(`You are using ${os.platform()}`);
console.log(`Application running on ${PORT}`);



/*
require("./app")(PORT).then(resolve => {
    console.log(`App running on port: ${PORT}`);
});*/