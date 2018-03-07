//Node.js 常用工具

var util = require('util');

//util.inherits

function Base(){
		this.name = 'base';
		this.base = 1992;
		this.sayHello = function(){
				console.log('Hello ' + this.name);
		}
}

Base.prototype.showName = function(){
		console.log(this.name);
}

function Sub(){
		this.name = 'sub';
}

util.inherits(Sub, Base);

var base = new Base();
var sub = new Sub();
base.showName();
sub.showName();
base.sayHello();
//sub.sayHello(); //这里子类只继承父类定义在原型中的元素,在构造方法内的不会继承



//util.inspect

function Person(){
		this.name = 'fiyc';
		this.toString = function(){
				return this.name;
		}
}

var obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj, true, 100));
