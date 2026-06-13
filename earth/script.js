const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Earth sphere
const geometry = new THREE.SphereGeometry(2, 64, 64);

const textureLoader = new THREE.TextureLoader();

const earthTexture = textureLoader.load(
  'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'
);

const material = new THREE.MeshPhongMaterial({
  map: earthTexture
});

const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

// Light (Sun)
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 3, 5);
scene.add(light);

// Ambient light
scene.add(new THREE.AmbientLight(0x222222));

camera.position.z = 6;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    earth.rotation.y += 0.002;

    renderer.render(scene, camera);
}

animate();

// Resize support
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
