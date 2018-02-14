document.title="Three 练习 让场景动起来"
function InitThree() {
	var width = window.innerWidth;
	var height = window.innerHeight;

	ThreeFactors(width, height,true);

	camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 1000;
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt({
        x : 0,
        y : 0,
        z : 0
    });
}

var mesh;
var mesh1;
function AddObject(){
	var geometry = new THREE.CylinderGeometry(100, 150, 400);
	var geometry1 = new THREE.CylinderGeometry(100, 150, 400);
	var material = new THREE.MeshLambertMaterial({
		color:0xFFFF00
	});
	mesh = new THREE.Mesh(geometry, material);
	mesh1 = new THREE.Mesh(geometry1, material);
	mesh1.position.x = mesh1.position.x + 500;
	scene.add(mesh);
	scene.add(mesh1);

	var light = new THREE.AmbientLight(0xFFFFFF);
	light.position.set(100,100,200);
	// scene.add(light);

	light = new THREE.PointLight(0xFFFFFF);
	light.position.set(0,0,300);
	scene.add(light);
}

function RenderLogic(){
	camera.position.x = camera.position.x + 1;
	mesh.position.x = mesh.position.x - 1
}