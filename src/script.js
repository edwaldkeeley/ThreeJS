import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Loading
const textureLoader = new THREE.TextureLoader();

const normalTexture = textureLoader.load("/textures/images.jpg");

// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
// const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial();
material.metalness = 1;
material.roughness = 0.1;
material.normalMap = normalTexture;
material.color = new THREE.Color("#fff");

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);
const pointLight2 = new THREE.PointLight(0xff0000, 2);
// pointLight2.position.x = 2;
// pointLight2.position.y = 3;
// pointLight2.position.z = 4;
pointLight2.position.set(-1.86, 1, -1.65);
pointLight2.intensity = 10;

scene.add(pointLight2);

// gui.add(pointLight2.position, "y").min(-3).max(3).step(0.01);
// gui.add(pointLight2.position, "x").min(-6).max(6).step(0.01);
// gui.add(pointLight2.position, "z").min(-3).max(3).step(0.01);
// gui.add(pointLight2, "intensity").min(0).max(10).step(0.01);

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1);
// scene.add(pointLightHelper);

// const light1 = gui.addFolder("Light 1");

const pointLight3 = new THREE.PointLight(0xff, 2);
// pointLight2.position.x = 2;
// pointLight2.position.y = 3;
// pointLight2.position.z = 4;
pointLight3.position.set(1.86, -2.05, -1.65);
pointLight3.intensity = 4.79;

scene.add(pointLight3);

// light1.add(pointLight3.position, "y").min(-3).max(3).step(0.01);
// light1.add(pointLight3.position, "x").min(-6).max(6).step(0.01);
// light1.add(pointLight3.position, "z").min(-3).max(3).step(0.01);
// light1.add(pointLight3, "intensity").min(0).max(10).step(0.01);

const light2Color = {
  color: 0xff0000,
};

// light1.addColor(light2Color, "color").onChange(() => {
//   pointLight3.color.set(light2Color.color);
// });

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1);
// scene.add(pointLightHelper2);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

/**
 * Animate
 */

// document.addEventListener('mousemove', onDocumentMouseMove);

// let mouseX = 0;
// let mouseY = 0;

// let targetX = 0;
// let targetY = 0;

// const windowHalfX = window.innerWidth / 2;

// const windowHalfY = window.innerHeight / 2;

// onDocumentMouseMove = (event) => {
//     mouseX = (event.clientX - windowHalfX);
//     mouseY = (event.clientY - windowHalfY);
// }
document.addEventListener("mousemove", onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;

const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowX;
  mouseY = event.clientY - windowY;
}
// document.addEventListener

const clock = new THREE.Clock();

const updateSize = (event) => {
  sphere.position.y = window.scrollY * 0.001;
};

window.addEventListener("scroll", updateSize);

const tick = () => {
  targetX = mouseX * 0.004;
  targetY = mouseY * 0.004;

  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;
  sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
  sphere.rotation.x += 0.5 * (targetY - sphere.rotation.x);
  sphere.position.z += 0.5 * (targetY - sphere.rotation.x);
  // Update Orbital Controls
  //   controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

const ambientLight = new THREE.AmbientLight(0xffffff);
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);
  star.indensity = 10;
  scene.add(pointLight, ambientLight);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.z = 30;
  // star.rotation.x += 0.5 * (targetY - sphere.rotation.x);
  star.position.x = x;
  star.position.set(x, y, z);
  star.userData.rx = Math.random() * 0.01 - 0.005;
  star.userData.ry = Math.random() * 0.01 - 0.005;
  star.userData.rz = Math.random() * 0.01 - 0.005;
  
    star.rotation.x += star.userData.rx;
    star.rotation.y += star.userData.ry;
    star.rotation.z += star.userData.rz;
  
  scene.add(star);
}



Array(200).fill().forEach(addStar);

tick();
