/*
new prototype探究
*/

//试验new出来的对象与类的关系
function demo1(){
		var Book = function(){
				this.name = 'test';
		}

		var b = new Book();

		var peq = b.__proto__ == Book.prototype;
		console.log(peq);
		console.log(typeof Book.prototype);
		console.log(typeof b);
		console.log(typeof Book);
		console.log(Object.keys(Book.prototype));

}

demo1();
