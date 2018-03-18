/*
原型模式

用原型实例指向创建对象的类, 使用与创建新的对象的共享原型对象的属性以及方法.
*/


//焦点图例子
var LoopImages = function(imgArr, container){
		this.imagesArray = imgArr;
		this.container = container;
}

LoopImages.prototype = {
		createImage: function(){},
		changeImage: function(){}
}

//不同的特效子类

//上下滑动切换类
var slideLoopImg = function(imgArr, container){
		LoopImages.call(this, imgArr, container);
}

slideLoopImg.prototype = new LoopImages();
slideLoopImg.prototype.changeImage = function(){
		console.log('slideLooping change mage function');
}

//渐隐式切换图片类
var FadeLoopImg = function(imgArr, container, arrow){
		LoopImages.call(this, imaArr, container);
		this.arrow = arrow;
}

FadeLoopImg.prototype = new LoopImages();
FadeLoopImg.prototype.changeImage = function(){
		console.log('FadeLoopimg changeimage function');
}


//实例化一个渐隐切换图片类
var fadeImg = new FadeLoopImg([
		'01.jpg',
		'02.jpg',
		'03.jpg',
		'04.jpg',
		
], 'slide', ['left.jpg','right.jpg']);
