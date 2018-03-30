/*
2.3.1 类式继承
类式继承即将子类的prototype赋值为父类的实例化对象, 这样子类就可以调用父类的方法和属性
*/

//父类
function superclass() {
	this.superValue = true;
}

superclass.prototype.getsuperValue = function () {
	return this.superValue;
}

//子类
function subclass() {
	this.subValue = false;
}

//继承父类
subclass.prototype = new superclass();

//为子类添加共有方法
subclass.prototype.getsubValue = function () {
	return this.subValue;
}

var instance = new subclass();

console.log(instance.getsuperValue());
console.log(instance.getsubValue());

/*
instanceof 通过判断对象的prototype链来确定这个对象是否是某个类的实例
*/

console.log(instance instanceof superclass);
console.log(instance instanceof subclass);
console.log(subclass instanceof superclass);
console.log(subclass.prototype instanceof superclass);

/*
类式继承存在2个缺点
1. 由于子类的prototype是父类的实例化对象, 如果父类中的共有属性是引用类型, 那么如果子类做出了修改, 会对所有子类造成影响
2. 创建父类的时候无法向父类传递参数.因此在实例化父类的时候无法对父类构造函数内的属性进行初始化

下面的代码说明了问题1
*/

function father() {
	this.books = ['Javascript', 'html', 'css'];
}

function child() { }

child.prototype = new father();

var c1 = new child();
var c2 = new child();

console.log(c1.books);
c2.books.push('Java');
console.log(c1.books);

/*
2.3.2 创建即继承,  构造函数继承
这里通过call函数, 在子类构造函数内调用父类的构造函数并替换this对象的指向来实现将父类的构造方法用于子类的赋值上

但是这种继承方式存在一个问题, 即子类无法调用父类prototype中定义的方法
*/

var superclass = function (id) {
	this.books = ['Javascript', 'html', 'css'];
	this.id = id;
}

superclass.prototype.showBooks = function () {
	console.log(this.books);
}

var subclass = function (id) {
	superclass.call(this, id);
}

var instance1 = new subclass(10);
var instance2 = new subclass(11);

console.log(instance1.books);
instance2.books.push('Java');
console.log(instance1.books);


/*
2.3.3 组合继承
即在子类构造方法类使用call调用父类的构造方法， 且设置子类的prototype为父类的实例化对象

缺点: 调用了2次父类的构造方法
*/
var superclass = function (name) {
	this.name = name;
	this.books = ['Javascript', 'html', 'css'];
}

superclass.prototype.getName = function () {
	console.log(this.books);
	console.log(this.name);
}

var subclass = function (name, time) {
	superclass.call(this, name);

	this.time = time;
}

subclass.prototype = new superclass();
subclass.prototype.getTime = function () {
	console.log(this.time);
}

var in1 = new subclass('fiyc', '123');
var in2 = new subclass('chenyifei', '456');

in1.getName();
in2.books.push('Java');
in1.getName();

/*
2.3.4 原型式继承

这种方式说白了只是类式继承的一种封装, 所以类式继承存在的问题它同样会存在
*/
function inheritobject(o) {
	//声明一个过渡函数对象
	function F() { }

	F.prototype = o;

	return new F();
}

/*
2.3.5 寄生式继承
*/

//声明基对象
var book = {
	name: 'js book',
	alikeBook: ['css book', 'html book']
}

function createBook(obj) {
	//通过原型继承方式创建新对象(类式继承)
	var o = inheritobject(obj);

	o.getName = function () {
		console.log(name);
	};

	//返回拓展后的新对象
	return o;
}

/*
2.3.6 寄生组合式继承
*/
//传递参数subclass 子类
//传递参数superclass 父类
function inheritPrototype(subclass, superclass) {
	//复制一份父类的原型副本保存在变量中
	var p = inheritobject(superclass.prototype);

	//修正因为重写子类原型导致子类的constructor属性被修改
	p.constructor = subclass;
	subclass.prototype = p;
}

/*
2.4 多继承 
*/

var extend = function (target, source) {
	for (var property in source) {
		target[property] = source[property];
	}

	return target;
}

//多继承 属性赋值
var mix = function () {
	var i = 1;
	var len = arguments.length;

	var target = arguments[0];
	var arg;

	for (; i < len; i++) {
		arg = arguments[i];
		target = extend(target, arg);
	}

	return target
}


