/*
1.3 用对象收编变量
*/

var checkobject = {
		checkName : function(){},
		checkEmail: function(){},
		checkPassword: function(){}
}

checkobject.checkEmail();

/*
1.4 对象的另一种形式
*/

var checkobject = function(){};
checkobject.checkName = function(){};
checkobject.checkEmail = function(){};
checkobject.checkPassword = function(){};

checkobject.checkEmail();

/*
1.5 真假对象
*/
var checkobject = function(){
		return {
				checkName : function(){};,
				checkEmail : function(){},
				checkPassword : function(){}
		}
}

var a = checkobject();
a.checkEmail();

/*
1.6 使用类
*/

var checkobject = function(){
		this.checkName = function(){};
		this.checkEmail = function(){};
		this.checkPassword = function(){};
}

var a = new checkobject();
a.checkEmail();

/*
1.7 将检测方法写在原型中
*/

var checkobject = function(){};
checkobject.prototype.checkName = function(){};
checkobject.prototype.checkEmail = function(){};
checkobject.prototype.checkPassword = function(){};

var a = new checkobject();
a.checkEmail();

/*
1.8 在方法结尾返回自身, 实现链式调用
*/
var checkobject = function(){};
checkobject.prototype = {
		checkName : function(){
				//...
				return this;
		},
		checkEmail: function(){
				//...
				return this;
		},
		checkPassword : function(){
				//...
				return this;
		}
};

var a = checkobject();
a.checkName().checkEmail().checkPassword();

/*
1.9 为每一个函数都添加公共方法
*/


Function.prototype.checkEmail = function(){};
var f = function(){};
f.checkEmail();

//上面这样的写法污染了原生对象Function.下面抽象出一个统一添加方法的功能方法

Function.prototype.addMethod = function(name, fn){
		this[name] = fn;
};

var methods = new Function();
methods.addMethod('checkName', function(){});
methods.checkName();

/*
优化1.9的方案, 实现链式添加与链式使用
*/

Function.prototype.addMethod = function(name, fn){
		this[name] = fn;
		return this;
};

var methods = new Function();
methods.addMethod('checkName', function(){
		//...
		return this;
})
		.addMethod('checkEmail', function(){
				//...
				return this;
		});

methods.checkName()
		.checkEmail();

/*
1.11 使用类式调用完成前面的功能
*/

Function.prototype.addMethod = function(name, fn){
		this.prototype[name] = fn;
		return this;
};

var Methods = function(){};
Methods.addMethod('checkName', function(){
		//..
		return this;
})
		.addMethod('checkEmail', function(){
				//...
				return this;
		});

var m = new Methods();
m.checkName().checkEmail();


