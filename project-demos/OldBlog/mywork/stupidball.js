<!-- ���� -->
//��������
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
//�߿�����
var sidex = 0;
var sidey = 0;
var sidewidth = 1000;
var sideheight = 600;
var sidelinewidth = 5;

//С������
var ball;
var tempSpeed = 0;
var distance = 0;
var eyes;
var mouse;
//�ϰ�������
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

<!-- ���� -->
//��ʼ������
function init(){
	//��ʼ����������
	gameBegin = false;
	score = 0;
	threadNum = 0;
	hindersIndex = 0;
	realhinderIndex = 0;
	hinders = new Array(10);
	ctx = document.getElementById("canvas").getContext('2d');
	canvas = document.getElementById("canvas");
	//�������¼�
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
	//����α�߳�
	interval = window.setInterval("thread()", time*100);
}

//������
function mouseDown(){
	if(!gameBegin){
		gameBegin = true;
	}else{
		ball.speed = - 20;
	}
}
function mouseMove(){}
function mouseUp(){}
//�����ຯ��
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
		//С���ƶ�
		tempSpeed = ball.speed;
		ball.speed = ball.speed + g*time;
		distance = (tempSpeed + ball.speed)*time/2;
		ball.y = ball.y + distance;
		eyes.y = ball.y - ball.rad/2;
		//�ϰ����ƶ�
		for(var i=0; i<hinders.length; i++){
			if(hinders[i] == null){
				break;
			}
			hinders[i].x = hinders[i].x - 1;
		}
		//���߳�ѭ�����г���1/3����Ļ���ʱ�� ����һ���µ��ϰ��ﲢ��������
		if(threadNum > (sidewidth/3)){
			threadNum = 0;
			randomheight = miniHeight + Math.floor(Math.random()*30);
			randomwidth = miniWidth + Math.floor(Math.random()*30);
			randomy = sideheight/4 + Math.floor(Math.random()*sideheight/2);
			hinder = new Hinder(1005, randomy, randomwidth, randomheight);
			hinders[hindersIndex] = hinder;
			hindersIndex++;
		}
		//��hindersIndex�������鳤��ʱ������װ��������
		if(hindersIndex >= hinders.length){
			hindersIndex = 0;
		}
	}
}

function draw(){
	msg.innerHTML = "SCORE  "+ score;
	//�����Ļ
	ctx.clearRect(0,0,sidewidth,sideheight);
	//������Ϸ�߿�
	ctx.strokeStyle = "rgb(0,0,0)";
	ctx.lineWidth = sidelinewidth;
	ctx.strokeRect(sidex, sidey, sidewidth, sideheight);
	
	//�����ϰ���
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
	
	//����С��
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
	//���С���Ƿ񴥼��ϰ���
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
//α�̺߳���
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
//������
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