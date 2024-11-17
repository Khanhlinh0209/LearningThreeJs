import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer();
//WebGLRenderer: Công cụ để hiển thị đồ họa 3D trong trình duyệt sử dụng WebGL.
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75, //Fov: Fied of View (Góc nhìn)
  window.innerWidth / window.innerHeight, //Tỷ lệ khung hình không bị méo
  0.1, //near: Khoảng cách gần nhất của camera
  1000 //khoảng cách xa nhất của camera
);

const orbit = new OrbitControls(camera, renderer.domElement);
//OrbitControls: giúp ta có thể tương tác vs Object 3D: xoay, phóng to, di chuyển
orbit.update();

const axesHelper = new THREE.AxesHelper(5);
//AxesHelper: Tạo trục tọa độ 3D với size là 5 (Default: 1)
//  Trục X: Red
//  Trục Y: Green
//  Trục Z: Blue

scene.add(axesHelper);
camera.position.set(0, 2, 5); // Đặt camera để thấy Object

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({
  //MeshBasicMaterial: chất liệu cái hộp đó
  color: 0x00ff00,
  wireframe: true, //để thấy được lưới vủa vật thể
});
const box = new THREE.Mesh(boxGeometry, boxMaterial); // tạo ra đối tượng 3d
//két hợp geometry với material
scene.add(box);

const planeGeometry = new THREE.BoxGeometry(30, 30, 0);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  // side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;

const gridHelper = new THREE.GridHelper();
scene.add(gridHelper);

const sphereGeometry = new THREE.SphereGeometry(2, 50, 50);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  wireframe: true,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(5, 3, 5);
//Góc xoay cho cái hộp (đơn vị: radian)
// box.rotation.x = 5;
// box.rotation.y = 5;

function animate() {
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate); // ~ callback
