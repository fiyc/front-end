// const buf = Buffer.from('0', 'utf8');
// console.log(buf);
// console.log(buf.length);


var pdu = Buffer.from([0x16, 0x10, 0x00, 0x12, 0x34, 0xab, 0xcd]);
console.log(pdu.toString());
console.log(pdu);
var start = pdu.readUInt16BE(1).toString(16);  //读第2,3位的字节
var quantity = pdu.readUInt16BE(3).toString(16); //读第4,5位的字节
var byteCount = pdu.readUInt8(5).toString(16);//读第6,7位的字节
console.log(start, quantity, byteCount);