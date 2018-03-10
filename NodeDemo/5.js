//Node.js Buffer

var buf = Buffer.from('fiyc', 'ascii');

console.log(buf.toString('hex'));

console.log(buf.toString('base64'));

console.log(buf.toString('utf8'));

console.log(buf.toString('ascii'));

console.log(buf.toString('utf16le'));

console.log(buf.toString('latin1'));


var buf1 = Buffer.alloc(10);
console.log(buf1.toString());

var buf2 = Buffer.alloc(10, 1);
console.log(buf2.toString());

var buf3 = Buffer.allocUnsafe(10);
console.log(buf3.toString());

var buf4 = Buffer.from([1, 2, 3]);
console.log(buf4.toString());

var buf5 = Buffer.from([0x74, 0xc3, 0xa9, 0x73, 0x74]);
console.log(buf5.toString());


var buf6 = Buffer.alloc(256);
var len = buf6.write('this is fiyc\'s node demo');
console.log('写入字节数: ' + len);
console.log('写入内容: ' + buf6.toString());
len = buf6.write('|', 1);
console.log('写入字节数: ' + len);
console.log('写入内容: ' + buf6.toString());

var buf7 = Buffer.concat([buf1, buf2, buf3, buf4, buf5, buf6]);
console.log(buf7.toString());

var a = [];
var max = 35;
for(var i=1; i<max; i++){
		a.push(i);
}

var buf8 = Buffer.from(a);

console.log(buf8.toString());
