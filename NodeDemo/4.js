//Node.js EventEmitter

var events = require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.on('error', function(err){
		console.log('has a error: ' + err);
});
eventEmitter.emit('error');

var listener1 = function(){
		console.log('listener1 action');
}


var listener2 = function(){
		console.log('listener2 action');
}


eventEmitter.on('conn', listener2);
eventEmitter.addListener('conn', listener1);


var connListenerCount = events.EventEmitter.listenerCount(eventEmitter, 'conn');
console.log(connListenerCount + ' 个监听器监听连接事件.');

eventEmitter.emit('conn');

eventEmitter.removeListener('conn', listener1);
console.log('listener1 不再接受监听');

connListenerCount = events.EventEmitter.listenerCount(eventEmitter, 'conn');
console.log(connListenerCount + ' 个监听器监听连接事件.');

eventEmitter.emit('conn');

