window.onload =function () {
	//getting the canvas
	var canvas = document.getElementById('canvas');
    //setting canvas width and height
    var width = window.innerWidth;
	var height  = window.innerHeight;
	canvas.setAttribute('width', width);
	canvas.setAttribute('height', height);

	var controls = {
		rotationSceneY: 0,
		positionXPointLight: 300,
		positionYPointLight: 200,
		positionZPointLight: 200,
		positionXDirectionalLight: 0,
		positionYDirectionalLight: 250,
		positionZDirectionalLight: 250
	};

	var gui = new dat.GUI();
	gui.add(controls, 'rotationSceneY').min(-0.05).max(0.05).step(0.005);
	gui.add(controls, 'positionXPointLight').min(-500).max(500).step(5);
	gui.add(controls, 'positionYPointLight').min(0).max(500).step(5);
	gui.add(controls, 'positionZPointLight').min(-500).max(500).step(5);
	
	gui.add(controls, 'positionXDirectionalLight').min(-500).max(500).step(5);
	gui.add(controls, 'positionYDirectionalLight').min(0).max(500).step(5);
	gui.add(controls, 'positionZDirectionalLight').min(-500).max(500).step(5);

	var renderer = new THREE.WebGLRenderer({canvas: canvas});
	renderer.setClearColor(0x1C0035);

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
	camera.position.set(0, 100, 1000);

	//Directional light
	const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.5);
	directionalLight.position.set(0, 250, 250);
	scene.add(directionalLight);

	//Point light
	const pointLight = new THREE.PointLight(0xFFFFFF, 1, 0, 2);
	pointLight.position.set(300, 200, 200);
	scene.add(pointLight);

	//Bottom plane
	var bottomPlane = new THREE.PlaneGeometry( 1000, 1000, 80, 80 );
	var material = new THREE.MeshPhongMaterial({color: 0x03E4FF});
	var meshBottomPlane = new THREE.Mesh(bottomPlane, material);
	meshBottomPlane.position.z = -150;
	meshBottomPlane.position.y = -150;
    meshBottomPlane.rotation.set(-Math.PI/2, 0.0, 0.0);
	scene.add(meshBottomPlane);

    //Cone
	var cone = new THREE.CylinderGeometry( 0, 100, 200, 100 );
	var material = new THREE.MeshPhongMaterial({color: 0xFF0357});
	var meshCone = new THREE.Mesh(cone, material);
	meshCone.position.z = -50;
	meshCone.position.y = -50;
	meshCone.position.x = -100;
    meshCone.rotation.set(0.0, 0.0, 0.0);
 	scene.add(meshCone);

	//Cylinder
	var cylinder = new THREE.CylinderGeometry( 100, 100, 200, 6 );
	var material = new THREE.MeshPhongMaterial({color: 0x6700D5});
	var cylinderMesh = new THREE.Mesh(cylinder, material);
	cylinderMesh.position.z = -50;
	cylinderMesh.position.y = -50;
	cylinderMesh.position.x = 100;
    cylinderMesh.rotation.set(0.0, 0.0, 0.0);
 	scene.add(cylinderMesh);

	//Sphere
 	var sphere = new THREE.SphereGeometry( 100,32,32 );
	var material = new THREE.MeshPhongMaterial({color: 0xF7FF00});
	var sphereMesh = new THREE.Mesh( sphere, material);
	sphereMesh.position.z = -50;
	sphereMesh.position.y = 150;
	sphereMesh.position.x = 100;
    sphereMesh.rotation.set(0.0, 0.0, 0.0);
 	scene.add(sphereMesh);

	//render function called 60 times a second
	function render(){
		//rotating the scene
		scene.rotation.y +=  controls.rotationSceneY;

		directionalLight.position.x = controls.positionXDirectionalLight;
		directionalLight.position.y = controls.positionYDirectionalLight;
		directionalLight.position.z = controls.positionZDirectionalLight;
		
		pointLight.position.x = controls.positionXPointLight;
		pointLight.position.y = controls.positionYPointLight;
		pointLight.position.z = controls.positionZPointLight;
		renderer.render(scene, camera);
		requestAnimationFrame(render);

	}
	render();
}