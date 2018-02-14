document.title = "Three练习 画网格"
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

/*
添加一条线, 并复制20条在z轴方向偏移
沿y轴旋转90度后赋值20条并在x轴方向偏移
*/
function AddObject(){
	var geometry = new THREE.Geometry();
    geometry.vertices.push( new THREE.Vector3( - 500, 0, 0 ) );
    geometry.vertices.push( new THREE.Vector3( 500, 0, 0 ) );

    for ( var i = 0; i <= 20; i ++ ) {

        var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ) );
        line.position.z = ( i * 50 ) - 500;
        scene.add( line );

        var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ) );
        line.position.x = ( i * 50 ) - 500;
        line.rotation.y = 90 * Math.PI / 180;
        scene.add( line );

    }
}

var changeCount = 1;
function RenderLogic(){
    if(camera.position.y >= 1000){
        changeCount = -1;
    }	

    if(camera.position.y <= 1){
        changeCount = 1;
    }

    camera.position.y = camera.position.y + changeCount;

}