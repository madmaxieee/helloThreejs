import * as THREE from "three";

const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });

const cube = new THREE.Mesh(geometry, material);

export { cube };
