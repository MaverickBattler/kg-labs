window.onload =function () {
	//getting the canvas
	var canvas = document.getElementById('canvas');
    //setting canvas width and height
    var width = window.innerWidth;
	var height  = window.innerHeight;
	canvas.setAttribute('width', width);
	canvas.setAttribute('height', height);

    //creating a panel with controls
	var controls = {
		rotationX: 0,
		rotationY: 0,
		rotationZ: 0,
		
		positionX: 0,
		positionY: 0,
		positionZ: 0
	};
	var gui = new dat.GUI();
	gui.add(controls, 'rotationX').min(-0.1).max(0.1).step(0.001);
	gui.add(controls, 'rotationY').min(-0.1).max(0.1).step(0.001);
	gui.add(controls, 'rotationZ').min(-0.1).max(0.1).step(0.001);
	gui.add(controls, 'positionX').min(-2).max(2).step(0.01);
	gui.add(controls, 'positionY').min(-2).max(2).step(0.01);
	gui.add(controls, 'positionZ').min(-2).max(2).step(0.01);

    //setting the background color
	var renderer = new THREE.WebGLRenderer({canvas: canvas});
	renderer.setClearColor(0xF5D4FF);

    //creating the scene
	var scene = new THREE.Scene();

    //adding the camera to the scene
	var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
	camera.position.set(0, 0, 1000);

    //adding light so we can see the color
	var light = new THREE.AmbientLight(0xffffff);
	scene.add(light);

    //adding the wireframe mesh to the scene
    var torus = new THREE.TorusGeometry(150, 50, 16, 50)
	var box = new THREE.BoxGeometry(200, 200, 200, 12, 12, 12)
	var material = new THREE.MeshPhongMaterial( {  color: 0x6A028A, wireframe: true} );
	var mesh = new THREE.Mesh(torus, material);
	scene.add(mesh);
  
    //render function called 60 times a second
    function render(){
        //rotating the mesh
        mesh.rotation.x +=  controls.rotationX;
        mesh.rotation.y +=  controls.rotationY;
        mesh.rotation.z +=  controls.rotationZ;
        //moving the mesh
        mesh.position.x +=  controls.positionX;
        mesh.position.y +=  controls.positionY;
        mesh.position.z +=  controls.positionZ;

        renderer.render(scene, camera);
        requestAnimationFrame(render);

    }
	render();
}