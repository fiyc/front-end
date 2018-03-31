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

var clients = {};

ws.on('connection', function(client){
    var name = client.protocol;
    if(clients[name]){
        client.send('已经有人用了这个名字了哦, 换一个试试吧~');
        client.close();
    }else{
        clients[name] = client;
        client.send('OK');
    }

    client.on('message', function(msg){
        var index = parseInt(Math.random() * resposnes.length);
        for(var key in clients){
            clients[key].send(`${name}||${msg}`);
        }
    })

    client.on('close', function(){
        clients[name] = undefined;
    });
});



