document.title="使用tween来完成动画"
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

	new TWEEN.Tween( mesh.position)
            .to( { x: -400 }, 3000 ).repeat( 1 ).start();


	// new TWEEN.Tween( camera.position)
 //            .to( { x: 800 }, 3000 ).repeat( Infinity ).start();
}

function RenderLogic(){
	TWEEN.update();
}