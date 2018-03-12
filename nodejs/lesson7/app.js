var ini1 = function(str){
		return +str;
}

var ini2 = function(str){
		return parseInt(str);
}

var int3 = function(str){
		return Number(str);
}

var number = '100';

var Suite = require('benchmark').Suite;

var suit = new Suite;

suit.add('+', function(){
				int1(number);
		})
		.add('parseInt', function(){
				int2(number);
		})
		.add('Number', function(){
				int3(number);
		})
		.on('cycle', function(event){
				console.log(String(event.target));
		})
		.on('complete', function(){
				console.log('Fastest is: ' + this.filter('fastest').map('name'));
		})
		.run({'async':true});
