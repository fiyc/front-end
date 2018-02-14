document.title = "将canvas作为纹理";
function InitThree() {
	clock();
	var width = window.innerWidth;
	var height = window.innerHeight;

	ThreeFactors(width, height);

	camera.position.x = 250;
    camera.position.y = 500;
    camera.position.z = 500;
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt({
        x : 250,
        y : 0,
        z : 0
    });

    // camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    // camera.position.z = 400;
}

var mesh;
var texture;
function AddObject(){
	//绘制立体网格
	var linegm = new THREE.Geometry();
	linegm.vertices.push(new THREE.Vector3(0, 0, 0));
	linegm.vertices.push(new THREE.Vector3(500, 0, 0));

	var lineX = new THREE.Line(linegm, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ));
	var lineZ = new THREE.Line(linegm, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ));
	lineZ.rotation.y = - 90 * Math.PI / 180;
	lineZ.position.x = 0;
	lineZ.position.y = 0;

	var lineY = new THREE.Line(linegm, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ));
	lineY.rotation.z = 90 * Math.PI / 180;
	lineY.position.x = 0;
	lineY.position.z = 0;

	scene.add(lineX);
	scene.add(lineY);
	scene.add(lineZ);

	//环境光
    var light = new THREE.AmbientLight( 0xFFFFFF );
    scene.add(light);

	var geometry = new THREE.CubeGeometry(150, 150, 150);
	texture = new THREE.Texture( canvas);
    var material = new THREE.MeshBasicMaterial({map:texture});
    texture.needsUpdate = true;
    mesh = new THREE.Mesh( geometry,material );
    scene.add(mesh);
}

function RenderLogic(){
	texture.needsUpdate = true;
	mesh.rotation.y -= 0.01;
    mesh.rotation.x -= 0.01;
}


