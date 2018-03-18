/*
抽象工厂模式

通过对类的工厂抽象使其业务用于对产品类簇的创建, 而不负责创建某一类产品的实例
*/


//在类的方法中手动抛出错误类模拟抽象类
//这里子类必须重写getPrice以及getspeed方法, 否则就会抛异常. 以此来实现抽象类的功能
var car = function(){};

car.prototype = {
		getPrice: function(){
				return new Error('抽象方法不能调用');
		},
		getspeed: function(){
				return new Error('抽象方法不能调用');
		}
		
}

/*
5.2 抽象工厂模式
*/
var VehicleFactory = function(subType, superType){
		//判断抽象工厂中是否有该抽象类
		if(typeof VehicleFactory[superType] === 'function'){

				//缓存类
				function F(){};
				//继承父类属性和方法
				F.prototype = new VehicleFactory[superType]();

				//将子类constructor指向子类
				subType.constructor = subType;
				subType.prototype = new F();
		}else{
				throw new Error('为常见该抽象类');
		}
}

//小汽车抽象类
VehicleFactory.car = function(){
		this.type = 'car';
}

VehicleFactory.car.prototype = {
		getPrice: function(){
				return new Error(抽象方法不能调用);
		},
		getspeed: function(){
				return new Error(抽象方法不能调用);
		}
}

//公交车抽象类
VehicleFactory.bus = function(){
		this.type = 'bus';
}

VehicleFactory.bus.prototype = {
		getPrice: function(){
				return new Error(抽象方法不能调用);
		},
		getspeed: function(){
				return new Error(抽象方法不能调用);
		}
}

/*
5.3 抽象与实现
*/

var BMW = function(price, speed){
		this.price = price;
		this.speed = speed;
}

VehicleFactory(BMW, 'car');
BMW.prototype.getPrice = function(){
		return this.price;
}

BMW.prototype.getspeed = function(){
		return this.speed;
}
