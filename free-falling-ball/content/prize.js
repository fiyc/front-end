var globalSetting = {
	// 中奖人数
	prizeCount : 1,
	//小球初始速度
	initSpeed : 10,
	//重力加速度
	g : 200,
	//碰撞损耗
	collisionLoss : 5,

	//摩擦损耗
	firctionLoss: 0.2,
	//周期时长
	threadTime : 0.01,

	//单位弧度
	unitRadian : 2 * Math.PI / 360,

	//中奖点
	touchPointY : [150, 160],

	//中奖人数
	maxTouchNum : 1
};

var AllPeopleNames  = [];
for(var i=0; i<100; i++){
	AllPeopleNames.push(`用户${i}`);
}

var boli = new Image();
boli.src = `Resources/boli.png`;
ballImags = [];
for(var i=1; i<8; i++){
	var image = new Image();
	image.src = `Resources/${i}-.png`;
	ballImags.push(image);
}

function randomRgbColor() { 
	return ballImags[parseInt(Math.random() * ballImags.length)];

	 var r = Math.floor(Math.random() * 256); 
	 var g = Math.floor(Math.random() * 256); 
	 var b = Math.floor(Math.random() * 256); 
	 return `rgb(${r},${g},${b})`; 
}


var prize = (function(){
	//所有员工球集合
	var AllPeople  = [];

	var isMouseDown = false;
	var moveX = null;
	var moveY = null;

	var canvas = document.getElementById("content");

	canvas.addEventListener("mousedown", mouseDown, false);
	canvas.addEventListener("mousemove", mouseMove, false);
	canvas.addEventListener("mouseup", mouseUp, false);
	var ctx = canvas.getContext('2d');
	ctx.fillStyle = 'rgba(255, 255, 255, 0)';

	//运动中的球集合
	var movingBalls = [];
	//临时球集合, 为了做碰撞检测
	var tempMovingBalls = [];

	//预插入球集合, 防止在插入过程中被覆盖
	var insertBall = [];

	var leftWall = 0;
	var topWall = 0;
	var rightWall = canvas.width;
	var bottomWall = canvas.height;

	var interval;
	var running = false;


	var ballInterval;
	var isoutputBall = false;

	var Vector = {
		"MakeCoordinateVector" : function(speedX, speedY, directX, directY){
			var v = new VectorModel();
			v.speedX = speedX;
			v.speedY = speedY;
			v.directX = directX;
			v.directY = directY;
			v.setVertor();
			return v;
		},

		"MakeVector" : function(radian, vi){
			var v = new VectorModel();

			var angle = radian / globalSetting.unitRadian;

			if(radian >= globalSetting.unitRadian * 360 || angle >= 360){
				radian = radian - globalSetting.unitRadian * 360;
			}

			if(radian < 0 || angle < 0){
				radian = radian + globalSetting.unitRadian * 360;
			}

			v.radian = radian;
			v.v = Math.abs(vi);
			v.angle = radian / globalSetting.unitRadian;
			v.setCoordinate();
			return v;
		}
	}

	var gVector = Vector.MakeCoordinateVector(0, globalSetting.g, 1, 1);

	var DataInit = function(){
		for(var i=0; i<AllPeopleNames.length; i++){
			var ball = new Ball(ctx, 20, randomRgbColor(), AllPeopleNames[i],leftWall + 20, 20, null);
			AllPeople.push(ball);
		}
		// var vector = Vector.MakeCoordinateVector(0, 0, 1, 1);
		// var ball = new Ball(ctx, 20, randomRgbColor(), "fiyc",200, 20, vector);
		// movingBalls.push(ball);

		// vector = Vector.MakeCoordinateVector(0, 200, 1, -1);
		// ball = new Ball(ctx, 20, randomRgbColor(), "fiyc",219, bottomWall - 20, vector);
		// movingBalls.push(ball);
	};

	var staticResourceDraw = function(){
		
		// if(globalSetting.maxTouchNum > 0){
		// 	ctx.strokeStyle = "rgb(0,0,0)";
		// 	ctx.lineWidth = 2;
		// 	ctx.moveTo(rightWall - 2, globalSetting.touchPointY[0]);
		// 	ctx.lineTo(rightWall - 2, globalSetting.touchPointY[1]);
		// 	ctx.stroke();
		// }
		

		ctx.drawImage(boli, 0, 0);
	};

	var threadLogic = function(){
		//清除屏幕
		ctx.clearRect(0,0,canvas.width,canvas.height);

		
		for(var i=0; i<insertBall.length; i++){
			movingBalls.push(insertBall[i]);
		}

		insertBall = [];

		for(var i=0; i<movingBalls.length; i++){
			movingBalls[i].Move();
		}

		movingBalls = tempMovingBalls;
		tempMovingBalls = [];

		for(var i=0; i<movingBalls.length; i++){
			movingBalls[i].Draw();
		}

		console.log(`员工池中存在个数: ${AllPeople.length}`);
		console.log(`运动球池中存在个数: ${movingBalls.length}`);

		//绘制静态物
		staticResourceDraw();
	};

	function Ball(ctx, r, color, name, x, y, vector){
		this.ctx = ctx;
		this.r = r;
		this.color = color;
		this.name = name;
		this.x = x;
		this.y = y;
		this.vector = vector;

		this.Move = function(){
			var newSpeed = this.CollisionCheck();

			if(newSpeed.length != 3){
				if(globalSetting.maxTouchNum > 0){
					globalSetting.maxTouchNum -= 1;
					alert(`用户${this.name}啦`);

					if(globalSetting.maxTouchNum == 0){
						isoutputBall = false;
						window.clearInterval(ballInterval);
					}
					return;
				}
			}

			//已经停止
			if(newSpeed[2].v == 0 && newSpeed[1] >= bottomWall - this.r){
				AllPeople.push(new Ball(this.ctx, this.r, this.color, this.name, leftWall + 20, 20, null));
			}else{
				tempMovingBalls.push(new Ball(this.ctx, this.r, this.color, this.name, newSpeed[0], newSpeed[1], newSpeed[2]));
			}

			
		};

		this.Draw = function(){
			// this.ctx.fillStyle = this.color;
			// this.ctx.beginPath();
			// this.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, true);
			// this.ctx.fill();
			this.ctx.fillStyle = 'black';
			this.ctx.textBaseline = 'middle';
			this.ctx.font  = 'bold 50px';
			this.ctx.drawImage(this.color, this.x - this.r, this.y - this.r);
			this.ctx.fillText (this.name, this.x - this.r/2, this.y, this.r);
		};

		this.CollisionCheck = function(){
			var nextX = this.x + this.vector.GetXDistance();
			var nextY = this.y + this.vector.GetYDistance();

			var resultX = nextX;
			var resultY = nextY;

			var resultVector = Vector.MakeCoordinateVector(this.vector.speedX, this.vector.speedY, this.vector.directX, this.vector.directY);
			resultVector = resultVector.AddVector(Vector.MakeCoordinateVector(0, globalSetting.g * globalSetting.threadTime, 1, 1));

			//与左壁碰撞检测
			if(nextX - this.r <leftWall  || (nextX - this.r == leftWall && resultVector.directX == -1)){
				resultVector.setDirectX(1, false);
				resultVector.setSpeedX(resultVector.speedX - globalSetting.collisionLoss, false);
				resultVector.setSpeedY(resultVector.speedY - globalSetting.firctionLoss, false);

				resultX = (globalSetting.threadTime - ((this.x - this.r - leftWall) / this.vector.speedX)) * resultVector.speedX + leftWall + this.r;
				// resultX = leftWall + this.r * 2;
			}

			//与右壁碰撞检测
			// if(nextX + this.r > rightWall || (nextX + this.r == rightWall && resultVector.directX == 1)){
			// 	resultVector.setDirectX(-1, false);
			// 	resultVector.setSpeedX(resultVector.speedX - globalSetting.collisionLoss, false);
			// 	resultVector.setSpeedY(resultVector.speedY - globalSetting.firctionLoss, false);
			// 	resultX =  rightWall - (globalSetting.threadTime - ((rightWall - (this.x + this.r)) / this.vector.speedX)) * resultVector.speedX - this.r;
			// }

			//与上壁碰撞检测
			if(nextY - this.r <= topWall && resultVector.directY == -1){
				resultVector.setDirectY(1, false);
				resultVector.setSpeedX(resultVector.speedX - globalSetting.firctionLoss, false);

				var leftTime = (globalSetting.threadTime - ((this.y - this.r - topWall) / ((this.vector.speedY + resultVector.speedY) / 2)))
				resultVector.setSpeedY(resultVector.speedY - globalSetting.collisionLoss, false);
				resultY = this.r + leftTime * (resultVector.speedY * 2 + globalSetting.g * leftTime) / 2
				resultVector.setSpeedY(resultVector.speedY + globalSetting.g * leftTime, false);
				// resultY = topWall + this.r;
			}

			//与下壁碰撞检测
			if(nextY + this.r >= bottomWall){
				resultVector.setSpeedX(resultVector.speedX - globalSetting.firctionLoss, false);
				if(resultVector.directY == 1){
					// var leftTime = globalSetting.threadTime - (bottomWall - (this.y + this.r)) / ((this.vector.speedY + resultVector.speedY) / 2)
					resultVector = resultVector.SubVector(Vector.MakeCoordinateVector(0, globalSetting.g * globalSetting.threadTime, 1, 1));
					resultVector.setDirectY(-1, false);
					resultVector.setSpeedY(resultVector.speedY - globalSetting.collisionLoss, false);
					resultY = bottomWall - this.r;
				}
			}

			// //是否受重力影响产生加速度
			// if(nextY + this.r < bottomWall){
			// 	resultVector = resultVector.AddVector(gVector);
			// }

			resultVector.setVertor();


			//与其他球碰撞检测
			for(var i = 0; i< movingBalls.length; i++){
				if(movingBalls[i].x == this.x && movingBalls[i].y == this.y && movingBalls[i].name == this.name){
					continue;
				} 

				var baseSectionX = [this.x, nextX];	
				var baseSectionY = [this.y, nextY];

				var targetx = movingBalls[i].x + movingBalls[i].vector.GetXDistance();
				var targety = movingBalls[i].y + movingBalls[i].vector.GetYDistance();

				//是否有接触
				if((targetx - resultX) * (targetx - resultX) + (targety - resultY) * (targety - resultY) < (this.r + movingBalls[i].r) * (this.r + movingBalls[i].r)){
					// var x = targetx - resultX;
					// var y = targety - resultY;
					var x = movingBalls[i].x - resultX;
					var y = movingBalls[i].y - resultY;

					var spliteVector = resultVector.SpliteVector(x, y);
					var targetSpliteVector = movingBalls[i].vector.SpliteVector(x, y);

					var message = `拆分方向: x : ${x}, y: ${y}\n`;
					message += `当前球速度：x : ${resultVector.speedX * resultVector.directX},  y : ${resultVector.speedY * resultVector.directY}\n`;
					message += `拆分速度1: x : ${spliteVector[0].speedX * spliteVector[0].directX},  y : ${spliteVector[0].speedY * spliteVector[0].directY}, 角度为: ${spliteVector[0].angle}\n`;
					message += `拆分速度2: x : ${spliteVector[1].speedX * spliteVector[1].directX},  y : ${spliteVector[1].speedY * spliteVector[1].directY}, 角度为: ${spliteVector[1].angle}\n`;
					message += `碰撞球速度：x : ${movingBalls[i].vector.speedX * movingBalls[i].vector.directX},  y : ${movingBalls[i].vector.speedY * movingBalls[i].vector.directY}\n`;
					message += `碰撞球拆分速度1: x : ${targetSpliteVector[0].speedX * targetSpliteVector[0].directX},  y : ${targetSpliteVector[0].speedY * targetSpliteVector[0].directY}, 角度为: ${targetSpliteVector[0].angle}\n`;
					message += `碰撞球拆分速度2: x : ${targetSpliteVector[1].speedX * targetSpliteVector[1].directX},  y : ${targetSpliteVector[1].speedY * targetSpliteVector[1].directY}, 角度为: ${targetSpliteVector[1].angle}\n`;
					movingBalls[i].vector.SpliteVector(x, y);
					if(spliteVector == null && targetSpliteVector == null){
						continue;
					}

					//追击碰撞
					if(Math.abs(spliteVector[0].radian - targetSpliteVector[0].radian) < globalSetting.unitRadian * 45){
						//被追击， 加速
						if(spliteVector[0].v < targetSpliteVector[0].v){
							spliteVector[0].v = (spliteVector[0].v + targetSpliteVector[0].v) / 2;

						}	
						//追击, 减速变向
						else if(spliteVector[0].v > targetSpliteVector[0].v){
							spliteVector[0].v = (spliteVector[0].v + targetSpliteVector[0].v) / 2;
							spliteVector[0].radian = spliteVector[0].radian + globalSetting.unitRadian * 180;
						}

					}
					//相遇碰撞或远离运动
					else{
							//基础球到碰撞球的向量
							var collisionVenterX = Math.abs(x);  
							var collisionVenterY = Math.abs(y);  

							var collisionVenterDirectX = 1;
							if(collisionVenterX != 0){
								collisionVenterDirectX = collisionVenterX / x;
							}

							var collisionVenterDirectY = 1;
							if(collisionVenterY != 0){
								collisionVenterDirectY = collisionVenterY / y;
							}


							var collisionVenter = Vector.MakeCoordinateVector(collisionVenterX, collisionVenterY, collisionVenterDirectY, collisionVenterDirectY);
							// console.log(`反方向向量碰撞检测, 碰撞角度: ${collisionVenter.angle}, 运动方向角度: ${targetSpliteVector[0].angle}`);
							//相遇碰撞, 减速变向
							if(Math.abs(collisionVenter.radian - targetSpliteVector[0].radian) > globalSetting.unitRadian * 45){
								spliteVector[0].v = (spliteVector[0].v + targetSpliteVector[0].v) / 2;
								spliteVector[0].radian = spliteVector[0].radian + globalSetting.unitRadian * 180;
							}
							
					}

					spliteVector[0].setCoordinate();

					// if(spliteVector[0].directX == targetSpliteVector[0].directX && spliteVector[0].directY == targetSpliteVector[0].directY){
					// 	if(spliteVector[0].v < targetSpliteVector[0].v){
					// 		spliteVector[0].v = (spliteVector[0].v + targetSpliteVector[0].v) / 2 * 0.8;
					// 	}else if(spliteVector[0].v > targetSpliteVector[0].v){
					// 		spliteVector[0].v = (spliteVector[0].v + targetSpliteVector[0].v) / 2 * 0.8;
					// 		spliteVector[0].setRadian(spliteVector[0].radian + globalSetting.unitRadian * 180, true);
					// 	}
					// }else{
					// 		spliteVector[0].v = (spliteVector[0].v + targetSpliteVector[0].v) / 2 * 0.8;
					// 		spliteVector[0].setRadian(spliteVector[0].radian + globalSetting.unitRadian * 180, true);
					// }

					resultVector = spliteVector[0].AddVector(spliteVector[1]);
					var t = resultVector.speedX;
					 t = resultVector.speedY;
					 t = resultVector.directX;
					 t = resultVector.directY;
				}
			}

			//与右壁碰撞检测
			if(nextX + this.r > rightWall || (nextX + this.r == rightWall && resultVector.directX == 1)){

				if(globalSetting.maxTouchNum > 0){
					//计算是否命中得奖点
					var moveTiming = (globalSetting.threadTime - ((rightWall - (this.x + this.r)) / this.vector.speedX));
					var touchY = this.y + moveTiming * (2 * (this.vector.speedY * this.vector.directY) + globalSetting.g * moveTiming) / 2;

					if(touchY >= globalSetting.touchPointY[0] && touchY <= globalSetting.touchPointY[1]){
						return [];
					}
				}
				


				resultVector.setDirectX(-1, false);
				resultVector.setSpeedX(resultVector.speedX - globalSetting.collisionLoss, false);
				resultVector.setSpeedY(resultVector.speedY - globalSetting.firctionLoss, false);
				resultX =  rightWall - (globalSetting.threadTime - ((rightWall - (this.x + this.r)) / this.vector.speedX)) * resultVector.speedX - this.r;
			}

			return [resultX, resultY,resultVector];
		};
	}

	function VectorModel(){
		this.speedX = 0;
		this.speedY = 0;
		this.directX = 0;
		this.directY = 0;
		this.radian = 0;
		this.angle = 0;
		this.v = 0;

		//根据现有的坐标系方式, 计算出向量值
		this.setVertor = function(){
			this.v = Math.sqrt((this.speedX * this.speedX) + (this.speedY * this.speedY));
			if(this.v != 0){
				if(this.speedX == 0){
					if(this.directY == 1){
						this.radian = globalSetting.unitRadian * 270;
					}else{
						this.radian = globalSetting.unitRadian * 90;
					}
				}else if (this.speedY == 0){
					if(this.directX == 1){
						this.radian = globalSetting.unitRadian * 0;
					}else{
						this.radian = globalSetting.unitRadian * 180;
					}
				}else{
					if(this.directX == 1 && this.directY == 1){
						this.radian = -1 * Math.atan(this.speedY / this.speedX) + globalSetting.unitRadian * 360;
					}else if(this.directX == 1 && this.directY == -1){
						this.radian = Math.atan(this.speedY / this.speedX);
					}else if(this.directX == -1 && this.directY == 1){
						this.radian = Math.atan(this.speedY / this.speedX) + globalSetting.unitRadian * 180;
					}else{
						this.radian = globalSetting.unitRadian * 180 - Math.atan(this.speedY / this.speedX);
					}
				}
			}

			this.angle = this.radian / globalSetting.unitRadian;

			if(this.radian >= globalSetting.unitRadian * 360 || this.angle >= 360){
				this.radian = this.radian - globalSetting.unitRadian * 360;
			}

			if(this.radian < 0 || this.angle < 0){
				this.radian = this.radian + globalSetting.unitRadian * 360;
			}

			this.angle = this.radian / globalSetting.unitRadian;
		};

		//根据现有向量计算出坐标系
		this.setCoordinate = function(){
			if(this.v == 0){
				this.speedX = 0;
				this.speedY = 0;
			}else{
				if(this.radian == 0){
					this.speedX = this.v;
					this.speedY = 0;
					this.directX = 1;
				}else if(this.radian == globalSetting.unitRadian * 90){
					this.speedY = this.v;
					this.speedX = 0;
					this.directY = -1;
				}else if(this.radian == globalSetting.unitRadian * 180){
					this.speedX = this.v;
					this.speedY = 0;
					this.directX = -1;
				}else if(this.radian == globalSetting.unitRadian * 270){
					this.speedY = this.v;
					this.speedX = 0;
					this.directY = 1;
				}else{
					this.speedX = Math.cos(this.radian) * this.v;
					this.directX = this.speedX / Math.abs(this.speedX);
					this.speedX = Math.abs(this.speedX);

					this.speedY = Math.sin(this.radian) * this.v;
					this.directY = this.speedY / Math.abs(this.speedY) * -1;
					this.speedY = Math.abs(this.speedY);
				}
			}
		};

		this.setDirectX = function(d, needUpdate){
			this.directX = d;
			if(needUpdate)
				this.setVertor();
		}

		this.setDirectY = function(d, needUpdate){
			this.directY = d;
			if(needUpdate)
				this.setVertor();
		}

		this.setSpeedX = function(x, needUpdate){
			if(x < 0)
				x = 0;
			this.speedX = x;
			if(needUpdate)
				this.setVertor();
		};

		this.setSpeedY = function(y, needUpdate){
			if(y < 0)
				y = 0;
			this.speedY = y;
			if(needUpdate)
				this.setVertor();
		};

		this.setRadian = function(radian, needUpdate){
			var angle = radian / globalSetting.unitRadian;

			if(radian >= globalSetting.unitRadian * 360 || angle >= 360){
				radian = radian - globalSetting.unitRadian * 360;
			}

			if(radian < 0 || angle < 0){
				radian = radian + globalSetting.unitRadian * 360;
			}
			this.radian = radian;

			this.angle = this.radian / globalSetting.unitRadian;
			if(needUpdate)
				this.setCoordinate();
		};

		this.setV = function(vi, needUpdate){
			this.v = Math.abs(vi);

			if(needUpdate)
				this.setCoordinate();
		};

		this.GetXDistance = function(){
			return this.speedX * this.directX * globalSetting.threadTime;
		};

		this.GetYDistance = function(){
			return globalSetting.threadTime * (this.speedY * this.directY * 2 + globalSetting.threadTime * globalSetting.g) / 2;
		};

		this.AddVector = function(vector){
			var newSpeedX = this.speedX * this.directX + vector.speedX * vector.directX;
			var newDirectX = 1;
			if(newSpeedX != 0){
				newDirectX = newSpeedX / Math.abs(newSpeedX);
				newSpeedX = Math.abs(newSpeedX);
			}

			var newSpeedY = this.speedY * this.directY + vector.speedY * vector.directY;
			var newDirectY = 1;
			if(newSpeedY != 0){
				newDirectY = newSpeedY / Math.abs(newSpeedY);
				newSpeedY = Math.abs(newSpeedY);
			}

			return Vector.MakeCoordinateVector(newSpeedX, newSpeedY, newDirectX, newDirectY);

		};

		this.SubVector = function(vector){
			var newSpeedX = this.speedX * this.directX - vector.speedX * vector.directX;
			var newDirectX = 1;
			if(newSpeedX != 0){
				newDirectX = newSpeedX / Math.abs(newSpeedX);
				newSpeedX = Math.abs(newSpeedX);
			}

			var newSpeedY = this.speedY * this.directY - vector.speedY * vector.directY;
			var newDirectY = 1;
			if(newSpeedY != 0){
				newDirectY = newSpeedY / Math.abs(newSpeedY);
				newSpeedY = Math.abs(newSpeedY);
			}

			return Vector.MakeCoordinateVector(newSpeedX, newSpeedY, newDirectX, newDirectY);
		}

		this.SpliteVector = function(x, y){
			var radion = 0;
			if(x == 0 && y == 0){
				return [Vector.MakeVector(0, 0), Vector.MakeVector(0, 0)];
			}else if(x == 0 && y > 0){
				radian = globalSetting.unitRadian * 270;
			}else if(x == 0 && y < 0){
				radian = globalSetting.unitRadian * 90;
			}else if(y == 0 && x > 0){
				radian = globalSetting.unitRadian * 0;	
			}else if(y ==0 && x < 0){
				radian = globalSetting.unitRadian *180;
			}else{
				radian = Math.atan(-y/x);
			}

			if(radian < 0){
				radian = radian + globalSetting.unitRadian * 360;
			}

			var subRadian = Math.abs(radian - this.radian);
			if(subRadian > globalSetting.unitRadian * 90 && subRadian < globalSetting.unitRadian * 270) {
				radian = radian + globalSetting.unitRadian *180;
			}

			if(radian > radian + globalSetting.unitRadian *360){
				radian = radian - globalSetting.unitRadian *360;
			}

			if(radian < 0){
				radian = radian + globalSetting.unitRadian *360;
			}

			var subRadian = Math.abs(this.radian - radian);

			var vi = Math.abs(Math.cos(subRadian) * this.v);
			// var vi = Math.cos(subRadian) * this.v;

			var sVectorOne = Vector.MakeVector(radian, vi);

			var sVectorTwo = this.SubVector(sVectorOne);

			return [sVectorOne, sVectorTwo];
		}
	}

	function mouseDown(e){
		var subX = e.clientX - leftWall/2;
		var subY = e.clientY - (bottomWall - leftWall/2);

		if(subX * subX + subY * subY <= leftWall/2 * leftWall/2){
			isMouseDown = true;
		}

		isMouseDown = true;
	}

	function mouseMove(e){
		if(isMouseDown){
			moveX = e.clientX;
			moveY = e.clientY;
		}
	}

	function mouseUp(e){
		var subX = e.clientX - leftWall/2;
		var subY = e.clientY - (bottomWall - leftWall/2);

		if(isMouseDown && subX * subX + subY * subY <= leftWall/2 * leftWall/2){
			isMouseDown = false;

			var speedX = Math.random() * 50;
			var speedY = 0;

			var vector = Vector.MakeCoordinateVector(speedX, speedY, 1, 1);
			var ball = new Ball(ctx, 20, randomRgbColor(), "fiyc",leftWall + 20, 20, vector);
			insertBall.push(ball);
		}

		return;

		isMouseDown = false;
		if(moveX != null && moveY != null){
			var subX = moveX - leftWall/2;
			var subY = moveY - (bottomWall - leftWall/2); 

			var directX = subX / Math.abs(subX);
			var directY = subY / Math.abs(subY);

			subX = Math.abs(subX);
			subY = Math.abs(subY);


			var vector = Vector.MakeCoordinateVector(subX, subY, directX, directY);
			var ball = new Ball(ctx, 10, randomRgbColor(), "fiyc",10, bottomWall - 10, vector);

			movingBalls.push(ball);

			moveX = null;
			moveY = null;
		}
	}
	

	return {
		"Init": function(){
			staticResourceDraw();
			DataInit();
			// interval = window.setInterval(function(){
			// 	threadLogic();
			// }, globalSetting.threadTime * 1000);
		},
		"Start": function(){
			interval = window.setInterval(function(){
				threadLogic();
			}, globalSetting.threadTime * 1000);
		},
		"Stop" : function(){
			window.clearInterval(interval);
		},
		"debug" : threadLogic,
		"timeTest" : function(){
			var time1 = new Date();
			for(var i=0; i<10000; i++){
				var a = 1;
				var b = 2;
				var c = Math.sqrt(a * a + b* b);
			}

			var time2 = new Date();
			alert(time2 - time1);
		},
		"startBall" : function(){
			if(!isoutputBall){
				isoutputBall = true;

				ballInterval = window.setInterval(function(){
						if(!isoutputBall){
							return;
						}

						if(AllPeople == null || AllPeople.length == 0){
							return;
						}

						var randomIndex = parseInt(Math.random() * AllPeople.length);
						var currentBall = AllPeople[randomIndex];

						AllPeople.splice(randomIndex, 1);

						var speedX = Math.random() * 100 + 100;
						var speedY = 0;

						var vector = Vector.MakeCoordinateVector(speedX, speedY, 1, 1);
						currentBall.vector = vector;
						insertBall.push(currentBall);
					}, 2000);
			}
		},
		"stopBall" : function(){
			isoutputBall = false;
			window.clearInterval(ballInterval);
		}
	};
})();

prize.Init();
prize.Start();
prize.startBall();














