var renderer;
var camera;
var scene;
var showPerformance;
var stats;


/* 
渲染器, 相机, 场景三要素初始化
IsShowPerformance 标识是否显示性能检测
*/
function ThreeFactors(width, height, IsShowPerformance = false){
	showPerformance = showPerformance;
	renderer = new THREE.WebGLRenderer({
							antialias:true
						});
	renderer.setSize(width, height);
	document.getElementById('canvas-frame').appendChild(renderer.domElement);
	renderer.setClearColor(0xFFFFFF, 1.0);

	camera = new THREE.PerspectiveCamera(70, width/height, 0.1, 1000);
	camera.position.z = 5;
	scene = new THREE.Scene();


	if(IsShowPerformance){
		showPerformance = true;
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = '0px';
		stats.domElement.style.top = '0px';
		document.getElementById('canvas-frame').appendChild(stats.domElement);
	}
}

function start(){
	InitThree();
	AddObject();
	Render();
}

function Render(){
	requestAnimationFrame(Render);
    renderer.clear();
    renderer.render(scene, camera);
	RenderLogic();
    if(showPerformance){
    	stats.update();
    }
}