/*
为每一个函数都添加一个检测方法
*/

//直接为Function的prototype定义方法
//缺点 污染Function
function demo1(){
		Function.prototype.checkMail = function(){
				console.log('this is check method..');
		};

		var method = function(){
				console.log('this is a method');
		}

		method.checkMail();	
}

//抽象出一个统一添加功能的方法, 为需要的Function添加
//函数式调用方法
function demo2(){
		Function.prototype.addMethod = function(name, fn){
				this[name] = fn;
				return this;
		};

		var method = new Function();
		method.addMethod('m1', function(){
				console.log('this is m1');
				return this;
		}).addMethod('m2', function(){
				console.log('this is m2');
				return this;
		});

		method.m1().m2();

}

//抽象出一个统一添加功能的方法, 为需要的Function添加
//类式调用方式
function demo3(){
		Function.prototype.addMethod = function(name, fn){
				this.prototype[name] = fn;
				return this;
		}

		var methods = function(){};
		methods.addMethod('m1', function(){
				console.log('this is m1...');
				return this;
		}).addMethod('m2', function(){
				console.log('this is m2...');
				return this;
		});

		var m = new methods();
		m.m1().m2();
		
}

demo3();

