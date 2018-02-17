// 三种常见的创建对象的方式
var newObject = {};

var newObject = Object.create( Object.prototype );

var newObject = new Object();


// 四种为对象赋值的方式

//1. Dot syntax

// Set properties
newObject.someKey = "Hello World";

// Get properties
var value = newObject.someKey;

// 2. Square bracket syntax

// Set properties
newObject["someKey"] = "Hello World";

// Get properties
var value = newObject["somekey"];

// 3. Object.defineProperty

// Set properties
Object.defineProperty( newObject, "someKey", {
		value: "Hello World",
		writable: true,
		enumerable: true,
		configurable: true
});

// If the above feels a little difficult to read, a short-hand could be written as follows

var defineProp = function ( obj, key, value){
		var config = {
				value: value,
				writable: true,
				enumerable: true,
				configurable: true
		};

		Object.defineProperty( obj, key, config );
};

// To use, we then create a new empty "person" object
var person = Object.create( Object.prototype );

// Populate the object with properties
defineProp( person, "car", "Delorean" );
defineProp( person, "dateOfBirth", "1981" );
defineProp( person, "hasBeard", false );

console.log( person );

// 4. Object.defineProperties
Object.defineProperties( newObject, {
		"someKey": {
				value: "Hello World",
				writable: true
		},

		"anotherKey": {
				value: "Foo bar",
				writable: false
		}
});

// 实现继承
// Create a race car driver that inherits from the person object
var driver = Object.create( person );

// Set some properties for the driver
defineProp(driver, "topSpeed", "100mph");

// Get an inherited property
console.log( driver.dataOfBirth );

// Get the property we set
console.log( driver.topSpeed );

//一个基本的构造函数
function Car( model, year, miles ){

		this.model = model;
		this.year = year;
		this.miles = miles;

		this.toString = function () {
				return this.model + " has done " + this.miles + " miles";
		}
}

// We can create new instances of the car
var civic = new Car( "Honda Civic", 2009, 20000 );
var mondeo = new Car( "Ford Mondeo", 2010, 5000 );

// and then open our browser console to view the
// output of the toString() method being called on
// these objects
console.log( civic.toString() );
console.log( mondeo.toString() );

//使用原型的构造函数来扩展
function Car( model, year, miles ){
		this.model = model;
		this.year = year;
		this.miles = miles;
}

Car.prototype.toString = function () {
		return this.model + " has done " + this.miles + " miles";
};
