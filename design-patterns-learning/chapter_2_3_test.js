var father = function (name, age) {
	this.name = name;
	this.age = age;
}

father.prototype.say = function () {
	console.log(`hello, my name is ${this.name}. I am ${this.age} yeas old.`);
}

var Childclass = function (name, age) {
	father.call(this, name, age);
}

Childclass.prototype.say = function () {
	this.say();
	console.log('I am child say');
}

var cc = new Childclass('fiyc', 25);
cc.say();


var child = inheritPrototype(new Function(), father);

var c = new child('fiyc', 26);

function inheritPrototype(subclass, superclass) {
	//复制一份父类的原型副本保存在变量中
	var p = inheritobject(superclass.prototype);

	//修正因为重写子类原型导致子类的constructor属性被修改
	p.constructor = subclass;
	subclass.prototype = p;
	return subclass;
}

function inheritobject(o) {
	//声明一个过渡函数对象
	function F() { }

	F.prototype = o;

	return new F();
}
