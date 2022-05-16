import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';

//Scene
const scene = new THREE.Scene();
//Params for camera
let deg = 75;
let aspect = window.innerWidth / window.innerHeight;
let min_dist = 0.1;
let max_dist = 1000;
//Camera
const camera = new THREE.PerspectiveCamera(deg, aspect, min_dist, max_dist);
//Renderer
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#background'), antialias: true });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);
camera.position.setX(-3);

// const geometry = new THREE.TorusGeometry( 10, 3, 100, 16 );
// const material = new THREE.MeshStandardMaterial( { color: 0xaa1231} );
// const torusKnot = new THREE.Mesh( geometry, material );
// scene.add( torusKnot );

// const loader = new THREE.GLTFLoader();
// loader.load('./trial.gltf',function(gltf){
//   scene.add(gltf.scene);
// });

// const controls = new OrbitControls(camera,renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.2, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(600).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('assets/spc.jpeg');
scene.background = spaceTexture;

const myTexture = new THREE.TextureLoader().load('assets/pp.jpg');
const me = new THREE.Mesh(new THREE.BoxGeometry(4, 4, 4), new THREE.MeshBasicMaterial({ map: myTexture }));
scene.add(me);
me.position.set(2,0,-8);

const mercuryTexture = new THREE.TextureLoader().load('assets/mercury.jpg');
const mercury = new THREE.Mesh(new THREE.SphereGeometry(1,32,32), new THREE.MeshStandardMaterial({map: mercuryTexture}));
scene.add(mercury);
mercury.position.set(-5,0,-4);

const venusTexture = new THREE.TextureLoader().load('assets/venus.jpg');
const venus = new THREE.Mesh(new THREE.SphereGeometry(3,32,32), new THREE.MeshStandardMaterial({map: venusTexture}));
scene.add(venus);
venus.position.set(-12,0,-3);

const earthTexture = new THREE.TextureLoader().load('assets/earth.jpg');
const earth = new THREE.Mesh(new THREE.SphereGeometry(4,32,32), new THREE.MeshStandardMaterial({map: earthTexture}));
scene.add(earth);
earth.position.set(-16,0,7);

const moonTexture = new THREE.TextureLoader().load('assets/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('assets/normal.jpg');
const moon = new THREE.Mesh(new THREE.SphereGeometry(0.6, 32, 32), new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture }));
scene.add(moon);
moon.position.set(-16,6,7);

const marsTexture = new THREE.TextureLoader().load('assets/mars.jpg');
const mars = new THREE.Mesh(new THREE.SphereGeometry(3,64,64), new THREE.MeshStandardMaterial({map:marsTexture}));
scene.add(mars);
mars.position.set(-18, 0, 17);

const jupiterTexture = new THREE.TextureLoader().load('assets/jupiter.jpg');
const jupiter = new THREE.Mesh(new THREE.SphereGeometry(10,64,64), new THREE.MeshStandardMaterial({map:jupiterTexture}));
scene.add(jupiter);
jupiter.position.set(-32, 0, 29);

const saturnTexture = new THREE.TextureLoader().load('assets/saturn.jpg');
const saturn = new THREE.Mesh(new THREE.SphereGeometry(7,64,64), new THREE.MeshStandardMaterial({map:saturnTexture}));
scene.add(saturn);
saturn.position.set(-32, 0, 60);

const geometry = new THREE.TorusGeometry(10, 2, 2, 200);
const codeTexture = new THREE.TextureLoader().load('assets/code.jpg');
const material = new THREE.MeshStandardMaterial({ map: codeTexture}); // color: 0xaa1231
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);
torus.position.set(-32, 0, 60);
torus.rotation.x = 0.8;
torus.rotation.y = -0.5;

const uranusTexture = new THREE.TextureLoader().load('assets/uranus.jpg');
const uranus = new THREE.Mesh(new THREE.SphereGeometry(5,64,64), new THREE.MeshStandardMaterial({map:uranusTexture}));
scene.add(uranus);
uranus.position.set(-20, 0, 82);

function moveCamera() {
  me.rotation.y += 0.01;
  me.rotation.z += 0.01;

  // mercury.rotation.x += 0.05;
  // mercury.rotation.y += 0.075;
  mercury.rotation.z += 0.05;

  venus.rotation.x += 0.05;
  // venus.rotation.y += 0.075;
  // venus.rotation.z += 0.05;

  // earth.rotation.x += 0.05;
  earth.rotation.y += 0.075;
  // earth.rotation.z += 0.05;

  moon.rotation.x += 0.05;
  // moon.rotation.y += 0.075;
  // moon.rotation.z += 0.05;

  if(moon.position.y >= 0){
    if(moon.position.x <= -16){
      moon.position.x -= 0.2;
      moon.position.y -= 0.2;
    }
    else{
      moon.position.x -= 0.2;
      moon.position.y += 0.2;
    }
  }
  else{
    if(moon.position.x >= -16){
      moon.position.x += 0.2;
      moon.position.y += 0.2;
    }
    else{
      moon.position.x += 0.2;
      moon.position.y -= 0.2;
    }
  }

  // mars.rotation.x += 0.05;
  mars.rotation.y += 0.075;
  // mars.rotation.z += 0.05;

  // jupiter.rotation.x += 0.05;
  // jupiter.rotation.y += 0.075;
  jupiter.rotation.z += 0.05;

  saturn.rotation.x += 0.05;
  // saturn.rotation.y += 0.075;
  // saturn.rotation.z += 0.05;

  // uranus.rotation.x += 0.05;
  uranus.rotation.y += 0.075;
  // uranus.rotation.z += 0.05;

  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.01;
  // camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0003;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);
  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.001;
  torus.rotation.z += -0.01;

  me.rotation.x += 0.01;
  moon.rotation.x += 0.01;
  renderer.render(scene, camera);
}

animate();

const light = new THREE.AmbientLight(0xffffff);
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10, 10, 10);
scene.add(pointLight, light);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(lightHelper,gridHelper);

const container = document.querySelector('#background')

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  // renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);