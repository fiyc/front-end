<!-- 属性 -->
//基本属性
var ctx;
var canvas;
var interval;
var gameBegin = false;
var time = 0.1;
var canvaswidth = 1000;
var canvasheight = 600;
var g = 9;
var threadNum = 0;
var score = 0;
//边框属性
var sidex = 0;
var sidey = 0;
var sidewidth = 1000;
var sideheight = 600;
var sidelinewidth = 5;

//小球属性
var ball;
var tempSpeed = 0;
var distance = 0;
var eyes;
var mouse;
//障碍物属性
var miniWidth = 60;
var miniHeight = 50;
var temp;
var hinders = new Array(10);
var hinder;
var hindersIndex = 0;
var realhinder;
var realhinderIndex = 0;

var randomheight;
var randomwidth;
var randomy;
<!-- --------------------------------------------------------------------------------------------------------- -->

<!-- 函数 -->
//初始化函数
function init(){
	//初始化基本属性
	gameBegin = false;
	score = 0;
	threadNum = 0;
	hindersIndex = 0;
	realhinderIndex = 0;
	hinders = new Array(10);
	ctx = document.getElementById("canvas").getContext('2d');
	canvas = document.getElementById("canvas");
	//添加鼠标事件
	canvas.addEventListener("mousedown", mouseDown, false);
	canvas.addEventListener("mousemove", mouseMove, false);
	canvas.addEventListener("mouseup", mouseUp, false);
	ball = new Ball(400,300,10);
	eyes = new Ball(ball.x-ball.rad/3, ball.y-ball.rad/2,2);
	mouse = new Mouse(Math.PI/6);
	
	randomheight = miniHeight + Math.floor(Math.random()*30);
	randomwidth = miniWidth + Math.floor(Math.random()*30);
	randomy = sideheight/4 + Math.floor(Math.random()*sideheight/2);
	hinder = new Hinder(700, randomy, randomwidth, randomheight);
	hinders[hindersIndex] = hinder;
	hindersIndex++;
	randomheight = miniHeight + Math.floor(Math.random()*30);
	randomwidth = miniWidth + Math.floor(Math.random()*30);
	randomy = sideheight/4 + Math.floor(Math.random()*sideheight/2);
	hinder = new Hinder(1005, randomy, randomwidth, randomheight);
	hinders[hindersIndex] = hinder;
	hindersIndex++;
	realhinder = hinders[realhinderIndex];
	realhinderIndex++;
	//运行伪线程
	interval = window.setInterval("thread()", time*100);
}

//监听器
function mouseDown(){
	if(!gameBegin){
		gameBegin = true;
	}else{
		ball.speed = - 20;
	}
}
function mouseMove(){}
function mouseUp(){}
//工具类函数
function move(){
	if(mouse.open){
		mouse.pi = mouse.pi + Math.PI/48;
	}else{
		mouse.pi = mouse.pi - Math.PI/48;
	}
	
	if(mouse.pi >= Math.PI/3){
		mouse.open = false;
	}
	
	if(mouse.pi <= 0){
		mouse.open = true;
	}
	if(gameBegin){
		//小球移动
		tempSpeed = ball.speed;
		ball.speed = ball.speed + g*time;
		distance = (tempSpeed + ball.speed)*time/2;
		ball.y = ball.y + distance;
		eyes.y = ball.y - ball.rad/2;
		//障碍物移动
		for(var i=0; i<hinders.length; i++){
			if(hinders[i] == null){
				break;
			}
			hinders[i].x = hinders[i].x - 1;
		}
		//当线程循环运行超过1/3个屏幕宽度时， 生成一个新的障碍物并加入数组
		if(threadNum > (sidewidth/3)){
			threadNum = 0;
			randomheight = miniHeight + Math.floor(Math.random()*30);
			randomwidth = miniWidth + Math.floor(Math.random()*30);
			randomy = sideheight/4 + Math.floor(Math.random()*sideheight/2);
			hinder = new Hinder(1005, randomy, randomwidth, randomheight);
			hinders[hindersIndex] = hinder;
			hindersIndex++;
		}
		//当hindersIndex大于数组长度时，数组装满，归零
		if(hindersIndex >= hinders.length){
			hindersIndex = 0;
		}
	}
}

function draw(){
	msg.innerHTML = "SCORE  "+ score;
	//清除屏幕
	ctx.clearRect(0,0,sidewidth,sideheight);
	//绘制游戏边框
	ctx.strokeStyle = "rgb(0,0,0)";
	ctx.lineWidth = sidelinewidth;
	ctx.strokeRect(sidex, sidey, sidewidth, sideheight);
	
	//绘制障碍物
	for(var i=0; i<hinders.length; i++){
		if(hinders[i] == null){
				break;
		}
		temp = hinders[i];
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.fillRect(temp.x, 0, temp.width, sideheight);
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillRect(temp.x, temp.y, temp.width, temp.height);
	}
	
	//绘制小球
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.rad, 0, 2*Math.PI, true);
	ctx.fill();
	
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.beginPath();
	ctx.arc(eyes.x, eyes.y, eyes.rad, 0, 2*Math.PI, true);
	ctx.fill();
	var temph = (Math.sin(mouse.pi)/Math.cos(mouse.pi))*ball.rad;
	ctx.beginPath();
	ctx.moveTo(ball.x,ball.y);
	ctx.lineTo(ball.x+ball.rad, ball.y - temph);
	ctx.lineTo(ball.x+ball.rad, ball.y + temph);
	ctx.moveTo(ball.x,ball.y);
	ctx.fill();
}

function check(){
	//检测小球是否触及障碍物
	if(ball.y-ball.rad <=0 || ball.y+ball.rad >= sideheight){
		return true;
	}
	
	if(ball.x+ball.rad > realhinder.x && ball.x-ball.rad < realhinder.x+realhinder.width){
		if(ball.y-ball.rad <= realhinder.y || ball.y+ball.rad >= realhinder.y+realhinder.height){
			return true;
		}
	}
	
	if(ball.x-ball.rad >= realhinder.x+realhinder.width){
		score++;
		realhinder = hinders[realhinderIndex];
		realhinderIndex++;
		if(realhinderIndex >= hinders.length){
			realhinderIndex = 0;
		}
		return false;
	}
}
//伪线程函数
function thread(){
	move();
	draw();
	threadNum++;
	if(check()){
		window.clearInterval(interval);
		alert("Try Again!");
		init();
	}
	
}
//对象函数
function Ball(x, y, rad){
	this.x = x;
	this.y = y;
	this.rad = rad;
	this.speed = 0;
}

function Hinder(x, y, width, height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

function Mouse(pi){
	this.pi = pi;
	this.open = true;
}
<!-- --------------------------------------------------------------------------------------------------------- -->