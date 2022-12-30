import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const canvas = document.querySelector('.first .canvas');
const renderer = new THREE.WebGLRenderer({canvas, alpha: true, antialias: true });
renderer.shadowMap.enabled = true;

const fov = 55;
const aspect = 1;
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
camera.position.x = 0;

const scene = new THREE.Scene();


let phone;
let loader = new GLTFLoader();

let textureLoader = new TextureLoader();
let diffuse =  textureLoader.load('/assets/models/phone_DIFFUSION.png');
diffuse.flipY = false;

let emissive =  textureLoader.load('/assets/models/phone_EMISSION.png');
emissive.flipY = false;

let normal =  textureLoader.load('/assets/models/phone_NORMAL.png');
normal.flipY = false;

let ao =  textureLoader.load('/assets/models/phone_AO.png');
ao.flipY = false;

let alpha =  textureLoader.load('/assets/models/phone_ALPHA.png');
alpha.flipY = false;

loader.load('/assets/models/phone.glb', (gltf) => {
    phone = gltf.scene.children[0];

    phone.children[0].material = new THREE.MeshPhysicalMaterial({ // [0] - Main
        map: ao,
        aoMap: ao,
        normalMap: normal
    });
    phone.children[1].material = new THREE.MeshPhysicalMaterial({ // [1] - Emmision
       map: emissive,
       emissiveMap: emissive,
       emissive: '#FFFFFF'
    });
    phone.children[2].material = new THREE.MeshPhysicalMaterial({ // [2] - Alpha
       map: alpha,
       alphaMap: alpha,
       alphaTest: 1,
    });

    phone.scale.set(0.1, 0.1, 0.1);
    phone.position.set(0, 0, 0.1);
    phone.rotateY(-0.5)
    scene.add(gltf.scene);
    animate();
});

function animate() {
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}

const createLights = () => {
    const ambientLight = new THREE.HemisphereLight(0x404040, 0x404040, 1);

    const directionalLight = new THREE.DirectionalLight(0xdfebff, 0.2);
    directionalLight.position.set(-300, 0, 600);

    const pointLight = new THREE.PointLight(0xa11148, 1, 1000, 2);
    pointLight.position.set(200, -100, 50);

    scene.add(ambientLight, directionalLight, pointLight);
};
createLights();

const handleWindowResize = () => {
    let HEIGHT = window.innerHeight;
    let WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
};
handleWindowResize();
window.addEventListener("resize", handleWindowResize, false);


const targetRocketPosition = 0.1;
const animationDuration = 10000;

let cx, cy, clientX, clientY, dx, dy, tiltx, tilty, radius, degree;
cx = window.innerWidth / 2
cy = window.innerHeight / 2
const rotate = () => {
    dx = clientX - cx;
    dy = clientY - cy;
    tiltx = dy / cy;
    tilty = dx / cx;
    radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2));
    degree = radius * 25;
}
document.querySelector('.first').addEventListener('mousemove', e => {
    clientX = e.pageX
    clientY = e.pageY
    requestAnimationFrame(rotate)
});

const loop = () => {
    const t = (Date.now() % animationDuration) / animationDuration;
    renderer.render(scene, camera);
    const delta = targetRocketPosition * Math.sin(Math.PI * 2 * t);
    if (phone) {
      phone.position.y = delta;
      camera.lookAt(phone.position.x, 0, phone.position.z);

      if (degree) {
        camera.rotateX(tiltx * 0.1)
        camera.rotateY(tilty * 0.2)

        phone.rotation.x = tiltx * 0.7;
        phone.rotation.y = tilty;
      }
    }
    requestAnimationFrame(loop);
};
loop();