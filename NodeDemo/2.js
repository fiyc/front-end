// Node.js 回调函数

var fs = require('fs');

var data = fs.readFileSync('input.txt');
console.log(data.toString());

console.log('阻塞代码!');


fs.readFile('input.txt', function(err, data){

				if(err){
				console.error(err);
				return
		}
		
		console.log(data.toString());

});

console.log('非阻塞代码!');

//这里加一个循环是为了测试读取文件的回调会在何时执行,
//本次代码执行发现回调需要在循环结束之后才执行到.
for(var i=0; i<100000; i++){
		console.log('just a loop ' + i);
}


