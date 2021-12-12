import * as THREE from "three";

const fov = 75;
const aspect = 2; // the canvas default
const near = 0.1;
const far = 100;

const useThree = () => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
<<<<<<< HEAD
  camera.position.set(0, 3, 5);
  camera.lookAt(0, 0, -2);
=======
  camera.position.set(0, 0, 10);
  camera.lookAt(0, 0, 0);
>>>>>>> 6191c62269622b6e2047f665f0934b587ea1f4d6

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 2);
  scene.add(light);
  const clock = new THREE.Clock();

  let _canvas = null;
  /**
   * @param canvas domnode to mount
   * @param {Array} shape [width, height]
   * @param {Object} cameraPos
   */
  const init = (canvas, [width, height]) => { 
    renderer.setSize(width, height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    _canvas = canvas;
    _canvas.appendChild(renderer.domElement);
  };

  const animate = (animation) => {
    animation(clock.getDelta());
    renderer.render(scene, camera);
    requestAnimationFrame(() => animate(animation));
  };

  const addObject = (object) => scene.add(object);

  const cleanUp = (canvas) => {
    canvas.removeChild(renderer.domElement);
  };

  return { init, animate, addObject, scene, cleanUp };
};

export default useThree;
