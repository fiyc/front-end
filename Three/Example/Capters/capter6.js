document.title = "光源的学习"
var IsLightOpen = true;
function InitThree() {
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
}

var dLight;
var hasLight = false;

function AddObject(){
	var geometry = new THREE.CubeGeometry( 200, 100, 50,4,4);
	var material = new THREE.MeshLambertMaterial( { color:0xdddddd} ); 
	var mesh = new THREE.Mesh( geometry,material);
    mesh.position.set(0, 0, 0);
    scene.add(mesh);

	var meshB = new THREE.Mesh( geometry,material);
    meshB.position.set(250, 0, 0); 
    scene.add(meshB);

	var meshC = new THREE.Mesh( geometry,material);
    meshC.position.set(500, 0, 0); 
    scene.add(meshC);

    //环境光
    var light = new THREE.AmbientLight( 0xFFFFFF );
    //方向光
    dLight = new THREE.DirectionalLight(0xFFBB00, 1);
    dLight.position.set(-500, 200, -100);

    //点光源
    sLight = new THREE.PointLight(0xFF0000);
    sLight.position.set(250, 0, 26);
	scene.add(light);
	scene.add(dLight);
	scene.add(sLight);
	hasLight = true;


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
}

function RenderLogic(){
	if(!IsLightOpen){
		scene.remove(dLight);
		hasLight = false;
	}else if(!hasLight){
		    scene.add(dLight);
	    hasLight = true;
	}

	
}

function lightClick(){
	var lightBtn = document.getElementById('light');
	if(IsLightOpen){
		lightBtn.innerHTML = "开灯";
		IsLightOpen = false;
	}else{
		lightBtn.innerHTML = "关灯";
		IsLightOpen = true;
	}
}

function showStatus(){
	console.log(IsLightOpen);
	console.log(hasLight);
}