/*
工厂方法模式

通过对产品类的抽象使其创建业务主要负责用于创建多类产品的实例
*/

var Factory = function (type, content) {
	if (this instanceOf Factory) {
		var s = new this[type](content);
		return s
	}else {
		return new Factory(type, content);
	}
}

Factory.prototype = {
	Java: function (content) {
		//...
	},
	Javascript: function (content) {
		//...
	},
	UI: function (content) {
		this.content = content;
		(function () {
			var div = document.createElement('div');
			div.innerHTML = content;
			div.style.border = '1px solid red';
			document.getElementById('container').appendchild(div);
		})(content);
	}
}
