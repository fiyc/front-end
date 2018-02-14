document.title="三维空间的观察"
function InitThree() {
	var width = window.innerWidth;
	var height = window.innerHeight;

	ThreeFactors(width, height,true);
	camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 2000 );

	camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 2000;
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
function AddObject(){
	var geometry = new THREE.CylinderGeometry(100, 150, 400);
	var material = new THREE.MeshLambertMaterial({
		color:0xFFFF00
	});
	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	var light = new THREE.AmbientLight(0xFFFFFF);
	light.position.set(100,100,200);
	// scene.add(light);

	light = new THREE.PointLight(0xFFFFFF);
	light.position.set(0,0,300);
	scene.add(light);

}

function RenderLogic(){
	camera.position.x = camera.position.x + 1;
}