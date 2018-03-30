// const http = require('http');
const WebSocket = require('ws');

// var server = http.createServer();

var resposnes = [
    '滚',
    '你好啊',
    '哈哈',
    '我去洗澡'
];

var ws = new WebSocket.Server({port: 8080});

ws.on('connection', function(ws){
    ws.on('message', function(msg){
        console.log(ws.clients);
        var index = parseInt(Math.random() * resposnes.length);
        ws.send(resposnes[index]);
    })

    ws.send('hello');
});


