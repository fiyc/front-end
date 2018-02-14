// import { ThreeFactors } from './TreeTemplete/Threefactors.js';
document.title = "Three练习 画一条直线"
function InitThree(){
	var width = window.innerWidth;
	var height = window.innerHeight;
	ThreeFactors(width, height);

	camera.position.x = 0;
    camera.position.y = 1000;
    camera.position.z = 0;
    camera.up.x = 0;
    camera.up.y = 0;
    camera.up.z = 1;
    camera.lookAt({
        x : 0,
        y : 0,
        z : 0
    });
}


var light;
var line;

/***
需要在场景中添加线， 光
***/
function AddObject(){
	//创建并添加光
	light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
	light.position.set(100, 100, 200);
	scene.add(light);


	//创建并添加线
	var geometry = new THREE.Geometry();
	var meterial = new THREE.LineBasicMaterial({
		vertexColors:THREE.VertexColors
	});

	var color1 = new THREE.Color(0x444444)
	var color2 = new THREE.Color(0xFF0000)

	var p1 = new THREE.Vector3( -100, 100, 100 );
    var p2 = new THREE.Vector3(  100, 0, -100 );
    geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    geometry.colors.push( color1, color2 );
    line = new THREE.Line( geometry, meterial, THREE.LinePieces );
    scene.add(line);
}

/*
对光进行偏移
*/
function RenderLogic(){
	light.position.x += 0.1;
	light.position.y += 0.1;
	light.position.z += 0.1;
}