
//Function to render STL model on browser
function STLViewer(model, elementID) {
    var elem = document.getElementById(elementID);  //div element OR cotainer where model will be rendered 

    //Setting up Perspective camera  
    var camera = new THREE.PerspectiveCamera(70, elem.clientWidth / elem.clientHeight, 1, 1000);
    camera.position.y = -10

    // Setting up web gl renderer  
    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(elem.clientWidth, elem.clientHeight);
    elem.appendChild(renderer.domElement);

    //Resize event listener to display model on whole viewport when resized  
    window.addEventListener('resize', function () {
        renderer.setSize(elem.clientWidth, elem.clientHeight);
        camera.aspect = elem.clientWidth / elem.clientHeight;
        camera.updateProjectionMatrix();
    }, false);

    //Orbital controls setup  

    //var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true;
    // controls.rotateSpeed = 0.05;
    // controls.dampingFactor = 0.1;
    // controls.enableZoom = true;
    // controls.autoRotate = true;
    // controls.autoRotateSpeed = .75;


    // Scene  
    var scene = new THREE.Scene();

    // Adding hemisphere light  
    scene.add(new THREE.HemisphereLight(0xffffff, 1.5));


    // const light = new THREE.PointLight(0xffffff, 2, 100);
    // light.position.set(10, 10, 50);
    // scene.add(light);


    (new THREE.STLLoader()).load(model, function (geometry) {
        var material = new THREE.MeshPhongMaterial({
            color: 'rgb(110,109,109)',
            specular: 100,
            shininess: 100
        });
        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        var middle = new THREE.Vector3();
        geometry.computeBoundingBox();
        geometry.boundingBox.getCenter(middle);
        mesh.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(
            -middle.x, -middle.y, -middle.z));
        var largestDimension = Math.max(geometry.boundingBox.max.x,
            geometry.boundingBox.max.y,
            geometry.boundingBox.max.z)
        camera.position.z = largestDimension * 1.9;
        var animate = function () {
            requestAnimationFrame(animate);
            //controls.update();
            renderer.render(scene, camera);
        };
        animate();
    });
}

