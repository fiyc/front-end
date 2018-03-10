/*
创建对象的安全模式
*/

function Book(name, author){
		if(this instanceof Book){
				this.name = name;
				this.author = author;
		}else{
				return new Book(name, author);
		}
}

var b = Book('my book', 'fiyc');
var c = new Book('my book', 'fiyc');

console.log(b.name);
console.log(b.author);
console.log(c.name);
console.log(c.author);

