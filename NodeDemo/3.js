//Node.js 事件循环

var events = require('events');
var eventEmitter = new events.EventEmitter();

var connectHander = function(){
		console.log('连接成功.');
		eventEmitter.emit('data_received');
};

var dataReceived = function(){
		console.log('数据接收成功.');
};

eventEmitter.on('connection', connectHander);
eventEmitter.on('data_received', dataReceived);

eventEmitter.emit('connection');

console.log('程序执行完毕.');
