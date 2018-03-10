//Node.js 全局对象

console.log(__filename);
console.log(__dirname);

process.on('exit', function(code){
		setTimeout(function(){
				console.log('该代码不会执行');
		}, 0);

		console.log('退出码为: ', code);
});



console.log(process.execPath);
console.log(process.platform);
process.exit(2);
console.log('程序执行结束');
