//Node.js Stream

var fs = require('fs');
var data = '';

var readerStream = fs.createReadStream('input.txt');

readerStream.setEncoding('UTF8');

readerStream.on('data', function(chunk){
		console.log('on data listener');
		data += chunk;
});

readerStream.on('end', function(){
		console.log(data);
});

readerStream.on('error', function(err){
		console.log(err.stack);
});


var writerStream = fs.createWriteStream('output.txt');
writerStream.write(data, 'UTF8');

writerStream.end();

writerStream.on('finish', function(){
		console.log('写入完成');
});



console.log('程序执行完毕');
