// Importar las librerías necesarias de Three.js
import * as THREE from 'three'; // Importa la biblioteca principal de Three.js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; // Importa el cargador de modelos GLTF
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Importa los controles de órbita

// Crear una nueva escena
const scene = new THREE.Scene(); // La escena es donde se colocan todos los objetos, luces y cámaras

// Crear una cámara perspectiva
const camera = new THREE.PerspectiveCamera(
    75, // Campo de visión en grados
    window.innerWidth / window.innerHeight, // Relación de aspecto
    0.1, // Distancia mínima de renderizado
    1000 // Distancia máxima de renderizado
);
camera.position.set(0, 1, 3); // Posicionar la cámara en (x: 0, y: 1, z: 3)

// Crear un renderizador WebGL
const renderer = new THREE.WebGLRenderer(); // Inicializa el renderizador
renderer.setSize(window.innerWidth, window.innerHeight); // Establece el tamaño del renderizador al tamaño de la ventana
renderer.setClearColor(0xeeeeee); // Establece un color de fondo claro para el renderizador
document.body.appendChild(renderer.domElement); // Añade el canvas del renderizador al documento HTML

// Añadir luces a la escena
const ambientLight = new THREE.AmbientLight(0x404040); // Luz ambiental que ilumina la escena uniformemente
scene.add(ambientLight); // Añadir luz ambiental a la escena

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Luz direccional que simula un sol
directionalLight.position.set(1, 1, 1).normalize(); // Posicionar y normalizar la dirección de la luz
scene.add(directionalLight); // Añadir luz direccional a la escena

// Cargar un modelo GLTF
const loader = new GLTFLoader(); // Crear una instancia del cargador GLTF
loader.load('shiba/shiba.glb', function (gltf) {
    scene.add(gltf.scene); // Añadir el modelo cargado a la escena
}, undefined, function (error) {
    console.error(error); // Manejar errores en la carga del modelo
});

// Configurar los controles de órbita para mover la cámara con el mouse
const controls = new OrbitControls(camera, renderer.domElement); // Crear controles de órbita para la cámara y el canvas del renderizador
controls.enableDamping = true; // Habilitar un efecto de amortiguamiento para suavizar los movimientos
controls.dampingFactor = 0.25; // Establecer el factor de amortiguamiento

// Función de animación para renderizar la escena continuamente
function animate() {
    requestAnimationFrame(animate); // Solicitar el siguiente frame de animación
    controls.update(); // Actualizar los controles para reflejar cualquier cambio en la posición de la cámara
    renderer.render(scene, camera); // Renderizar la escena desde la perspectiva de la cámara
}

animate(); // Iniciar el bucle de animación

// Manejo del redimensionamiento de la ventana para ajustar la cámara y el renderizador
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight; // Actualizar la relación de aspecto de la cámara al redimensionar
    camera.updateProjectionMatrix(); // Actualizar la matriz de proyección para reflejar los cambios en la relación de aspecto
    renderer.setSize(window.innerWidth, window.innerHeight); // Ajustar el tamaño del renderizador al nuevo tamaño de ventana
});