const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000000);

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

const atmosphereGeometry = new THREE.SphereGeometry(5.15, 64, 64);

const atmosphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x66aaff,
    transparent: true,
    opacity: 0.15
});

const atmosphere = new THREE.Mesh(
    atmosphereGeometry,
    atmosphereMaterial
);

scene.add(atmosphere);

// Light (Sun)
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 3, 5);
scene.add(light);

// Ambient light
scene.add(new THREE.AmbientLight(0x222222));

camera.position.z = 6;

// Create stars
const starGeometry = new THREE.BufferGeometry();
const starCount = 5000;

const positions = [];

for (let i = 0; i < starCount; i++) {
    positions.push((Math.random() - 0.5) * 2000);
    positions.push((Math.random() - 0.5) * 2000);
    positions.push((Math.random() - 0.5) * 2000);
}

starGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3)
);

const starMaterial = new THREE.PointsMaterial({
    size: 3,
    color: 0xffffff
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    earth.rotation.y += 0.002;

    atmosphere.rotation.y += 0.002;

    renderer.render(scene, camera);
}

animate();

// Resize support
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
