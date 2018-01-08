const os = require('os');
const http = require('http');
const io = require('socket.io');
const app = require('./app');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app().callback());
const socket = io.listen(server);

server.listen(PORT);

console.log(`You are using ${os.platform()}`);
console.log(`Application running on ${PORT}`);

let buffer = [];
let count = 0;

socket.on('connection', client => {
    count++;

    client.emit('message', {
		buffer: buffer,
		count: count
    });
    
    client.broadcast.emit('message', { 
        count: count, 
        sessionId: client.sessionId 
    });
    
    client.on('reset', () => {
        client.broadcast.emit('reset');
    });

    client.on('clear', () => {
        buffer = [];
        client.broadcast.emit('clear');
    });

    client.on('disconnect', () => {
        count--;
        
        client.broadcast.emit('message', {
            count: count, 
            sessionId: client.sessionId
        });
    });
});