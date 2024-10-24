import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


window.addEventListener('resize', () => {
    // Adjust camera aspect ratio and update projection matrix
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Adjust renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(30);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

const backgroundTexture = new THREE.TextureLoader().load('sunset.jpg');
scene.background = backgroundTexture;

const surferTexture = new THREE.TextureLoader().load('surfer.png');
const surfer = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshBasicMaterial({ map: surferTexture, transparent: true })
);

surfer.rotateZ(-1.8);

surfer.position.set(37, 7, -7);
scene.add(surfer);


let initialRotation = surfer.rotation.z;

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;

    surfer.rotation.z = initialRotation + t * -0.0005;
}

document.body.onscroll = moveCamera;

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
