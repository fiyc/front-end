/*
2.2 创建一个类

关于类中this的个人理解
在函数内, this指向的是调用这个函数的对象.
假设有函数
var A = function(name){
	this.name = name;
}

若直接调用A(), 则此时this对象指向了window对象
当使用new关键字时, 会创建一个新对象, 此时this指向这个新对象

因此new A() 的赋值过程可以粗略的理解为类似下面的样子
var a = {};
A.call(a);

*/
var Book = function(id, bookname, price){
		this.id = id;
		this.bookname = bookname;
		this.price = price;
}

Book.prototype.display = function(){
		console.log(`bookid: ${this.id}, bookname: ${this.bookname}, price: ${this.price}`);
};

/*

通过this添加的属性, 方法与在prototype中添加的属性和方法的区别

* 通过this添加的属性是在当前对象上添加的
* 通过prototype添加的属性, 在新创建对象时, 它的__proto__会指向创建类的prototype, 所以在使用这些方法的时候, 需要通过prototype一级一级查找.
下面的代码用来验证这一说法
*/

var book = new Book(1, 'JavaScript设计模式', 58);
book.display();
console.log(book.__proto__ === Book.prototype);
var book2 = new Book(2, 'CSS设计指南', 30);
console.log(book2.__proto__ === book.__proto__);

/*
constructor 是一个属性, 当创建一个函数或者对象时都会为其创建一个原型对象prototype
在prototype对象中又会创建一个constructor属性, 它指向的就是拥有整个原型对象的函数或对象.

在上面的例子中Book.prototype.constructor 指向了Book

下面的代码用来验证这一说法
*/

console.log(Book.prototype.constructor === Book);
console.log(Book.prototype.constructor.prototype.constructor === Book);

/*
私有属性与私有方法
共有属性与共有方法
*/

var Book = function(id, name, price){
		var num = 1;

		function checkId(){}

		this.getName = function(){}
		this.getPrice = function(){}
		this.setName = function(){}
		this.setPrice = function(){}
		this.id = id;
		this.copy = function(){}
		this.setName(name);
		this.setPrice(price);
}

/*
类静态共有属性和方法, 对象不能访问
*/
Book.isChinese = true;
Book.resetTime = function(){
		console.log('new time');
}


/*
通过闭包来实现类的静态变量
*/

var Book = (function(){
		//静态私有变量
		var bookNum = 0;

		//静态私有方法
		function checkBook(name){
				
		}

		//返回构造函数
		return function(newId, newName, newPrice){
				//私有变量
				var name, price;

				//私有方法
				function checkID(id){}

				this.getName = function(){};
				this.getPrice = function(){};
				this.setName = function(){};
				this.setPrice = function(){};

				this.id = newId;
				this.copy = function(){};
				bookNum++;

				if(bookNum > 100){
						throw new Error('我们仅出版100本书');
				}

				this.setName(name);
				this.setPrice(price);
		}
})();

Book.prototype = {
		isJSBook : false,
		display: function(){}
}


/*
2.2.4 创建对象的安全模式
*/

var Book = function(title, time, type){
		if(this instanceof Book){
				this.title = title;
				this.time = time;
				this.type = type;
		}else{
				return new Book(title, time, type);
		}
}
