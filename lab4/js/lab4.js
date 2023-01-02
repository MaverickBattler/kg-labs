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
	};

	var gui = new dat.GUI();
	gui.add(controls, 'rotationSceneY').min(-0.05).max(0.05).step(0.005);

	var renderer = new THREE.WebGLRenderer({canvas: canvas});
	renderer.setClearColor(0x1C0035);

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
	camera.position.set(0, 150, 1200);

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
	const loader1 = new THREE.TextureLoader();
	const texture1 = loader1.load('https://thumbs.dreamstime.com/b/seamless-texture-fresh-green-grass-growing-bush-92593945.jpg');
	var material1 = new THREE.MeshPhongMaterial({map: texture1});
	var meshBottomPlane = new THREE.Mesh(bottomPlane, material1);
	meshBottomPlane.position.z = -150;
	meshBottomPlane.position.y = -150;
    meshBottomPlane.rotation.set(-Math.PI/2, 0.0, 0.0);
	scene.add(meshBottomPlane);

    //Cone
	var cone = new THREE.CylinderGeometry( 0, 100, 200, 100 );
	const loader2 = new THREE.TextureLoader();
	const texture2 = loader2.load('https://images-cdn.welcomesoftware.com/Zz02Zjk0ZmY2NjkyNjExMWViODczMGU5N2I0YmY0OWYzNQ==');
	var material2 = new THREE.MeshPhongMaterial({map: texture2});
	var meshCone = new THREE.Mesh(cone, material2);
	meshCone.position.z = -50;
	meshCone.position.y = -50;
	meshCone.position.x = -100;
    meshCone.rotation.set(0.0, 0.0, 0.0);
 	scene.add(meshCone);
	
	//Cylinder
	var cylinder = new THREE.CylinderGeometry( 100, 100, 200, 6 );
	const loader3 = new THREE.TextureLoader();
	const texture3 = loader3.load('https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/c9cc861f-1716-4b6d-aea5-c20e55649b42/metal2.jpg');
	var material3 = new THREE.MeshPhongMaterial({map: texture3});
	var cylinderMesh = new THREE.Mesh(cylinder, material3);
	cylinderMesh.position.z = -50;
	cylinderMesh.position.y = -50;
	cylinderMesh.position.x = 100;
    cylinderMesh.rotation.set(0.0, 0.0, 0.0);
 	scene.add(cylinderMesh);

	//Sphere
 	var sphere = new THREE.SphereGeometry( 100,32,32 );
	const loader4 = new THREE.TextureLoader();
	const texture4 = loader4.load('https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/091947c7-db19-4c7c-bbf1-9a1e7a9d61c8/granular7.jpg');
	var material4 = new THREE.MeshPhongMaterial({map: texture4});
	var sphereMesh = new THREE.Mesh( sphere, material4);
	sphereMesh.position.z = -50;
	sphereMesh.position.y = 150;
	sphereMesh.position.x = 100;
    sphereMesh.rotation.set(0.0, 0.0, 0.0);
 	scene.add(sphereMesh);

	//render function called 60 times a second
	function render(){
		//rotating the scene
		scene.rotation.y +=  controls.rotationSceneY;
		
		renderer.render(scene, camera);
		requestAnimationFrame(render);

	}
	render();
}