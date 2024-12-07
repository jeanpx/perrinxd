import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Crear la escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controladores de la cámara
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 1, 5); // Ajustar posición inicial de la cámara

// Cargar el modelo GLB
const loader = new GLTFLoader();
loader.load('shiba/shiba.glb', (gltf) => {
    const model = gltf.scene;
    scene.add(model);
    
    // Animación del modelo (opcional)
    const animate = () => {
        requestAnimationFrame(animate);
        model.rotation.y += 0.01; // Rotar el modelo
        controls.update(); // Actualizar controles
        renderer.render(scene, camera);
    };
    animate();
}, undefined, (error) => {
    console.error('Error al cargar el modelo:', error);
});

// Ajustar tamaño al redimensionar ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
