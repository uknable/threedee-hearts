var THREE = require("three");
// import * as THREE from "three";
var STLLoader = require("three/examples/jsm/loaders/STLLoader.js")
// import { STLLoader } from './STLLoader.js';
var Stats = require("three/examples/jsm/libs/stats.module.js")
// import Stats from './stats.module.js';
var GUI = require("three/examples/jsm/libs/dat.gui.module.js")
// import { GUI } from './dat.gui.module.js';
var OrbitControls = require("three/examples/jsm/controls/OrbitControls")
// import { OrbitControls } from "/three/examples/jsm/controls/OrbitControls";

var container, stats;
var camera, scene, raycaster, renderer;

var mouse = new THREE.Vector2(), INTERSECTED;

var params = {
    clipIntersection: true,
    planeConstant: 0,
    showHelpers: false
};

var clipPlanes = [
    new THREE.Plane(new THREE.Vector3(1, 0, 0), 0),
    new THREE.Plane(new THREE.Vector3(0, - 1, 0), 0),
    new THREE.Plane(new THREE.Vector3(0, 0, - 1), 0)
];

var radius = 100, theta = 0;

init();
animate();

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);


    var loader = new STLLoader();

    // var material = new THREE.MeshPhongMaterial({ color: 0xAAAAAA, specular: 0x111111, shininess: 200 });
    var material = new THREE.MeshLambertMaterial({

        color: new THREE.Color().setHSL(Math.random(), 0.5, 0.5),
        side: THREE.DoubleSide,
        clippingPlanes: clipPlanes,
        clipIntersection: params.clipIntersection

    });

    loader.load('./16571.stl', function (geometry) {

        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(0, 15, 77);
        mesh.rotation.set(0, 0, 0);
        mesh.scale.set(0.1, 0.1, 0.1);

        scene.add(mesh);

    });

    raycaster = new THREE.Raycaster();

    // helpers

    var helpers = new THREE.Group();
    helpers.add(new THREE.PlaneHelper(clipPlanes[0], 2, 0xff0000));
    helpers.add(new THREE.PlaneHelper(clipPlanes[1], 2, 0x00ff00));
    helpers.add(new THREE.PlaneHelper(clipPlanes[2], 2, 0x0000ff));
    helpers.visible = false;
    scene.add(helpers);

    // gui

    var gui = new GUI();

    // gui.add(params, 'clipIntersection').name('clip intersection').onChange(function (value) {

    // 	var children = group.children;

    // 	for (var i = 0; i < children.length; i++) {

    // 		children[i].material.clipIntersection = value;

    // 	}

    // 	render();

    // });

    gui.add(params, 'planeConstant', -4, 4).step(0.01).name('plane constant').onChange(function (value) {

        for (var j = 0; j < clipPlanes.length; j++) {

            clipPlanes[j].constant = value;

        }

        render();

    });

    gui.add(params, 'showHelpers').name('show helpers').onChange(function (value) {

        helpers.visible = value;

        render();

    });

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.localClippingEnabled = true;
    container.appendChild(renderer.domElement);

    var controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render); // use only if there is no animation loop
    controls.minDistance = 7;
    controls.maxDistance = 15;
    controls.enablePan = false;

    stats = new Stats();
    container.appendChild(stats.dom);

    document.addEventListener('mousemove', onDocumentMouseMove, false);



    //

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function onDocumentMouseMove(event) {

    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

}

//

function animate() {

    requestAnimationFrame(animate);

    render();
    stats.update();

}

function render() {

    // theta += 0.1;

    // camera.position.x = radius * Math.sin(THREE.MathUtils.degToRad(theta));
    // camera.position.y = radius * Math.sin(THREE.MathUtils.degToRad(theta));
    // camera.position.z = radius * Math.cos(THREE.MathUtils.degToRad(theta));
    camera.lookAt(scene.position);

    camera.updateMatrixWorld();

    // find intersections

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {

        if (INTERSECTED != intersects[0].object) {

            if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex(0xff0000);

        }

    } else {

        if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

        INTERSECTED = null;

    }

    renderer.render(scene, camera);

}
