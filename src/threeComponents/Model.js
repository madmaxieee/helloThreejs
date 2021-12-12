import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import MODEL from "../models/remy_gltf/remy.gltf";

let model, skeleton, mixer;

const allActions = [];
const baseActions = {
  idle: { weight: 0 },
  walk: { weight: 1 },
  run: { weight: 0 },
};
function setWeight(action, weight) {
  action.enabled = true;
  action.setEffectiveTimeScale(1);
  action.setEffectiveWeight(weight);
}
const additiveActions = {
  sneak_pose: { weight: 0 },
  sad_pose: { weight: 0 },
  agree: { weight: 0 },
  headShake: { weight: 0 },
};
let numAnimations;

function activateAction(action) {
  const clip = action.getClip();
  const settings = baseActions[clip.name] || additiveActions[clip.name];
  setWeight(action, settings.weight);
  action.play();
}

function updateModel(clockDelta) {
  if (allActions.length !== numAnimations) return;

  for (let i = 0; i !== numAnimations; ++i) {
    const action = allActions[i];
    const clip = action.getClip();
    const settings = baseActions[clip.name] || additiveActions[clip.name];
    settings.weight = action.getEffectiveWeight();
  }
  mixer.update(clockDelta);
}

const blue_mask = new THREE.TextureLoader().load("/static/media/blue_mask.png");
const red_mask = new THREE.TextureLoader().load("/static/media/red_mask.png");

const addModel2Scene = (scene) => {
  const loader = new GLTFLoader();

  loader.load(MODEL, function (gltf) {
    model = gltf.scene;
    const body = model.getObjectByName("Body");
    body.material.map = new THREE.TextureLoader().load(
      "static/media/Remy_Body_Diffuse_w_light.png"
    );
    body.material.alphaMap = blue_mask;
    console.log(body);
    scene.add(model);

    skeleton = new THREE.SkeletonHelper(model);
    skeleton.visible = false;
    scene.add(skeleton);

    const animations = gltf.animations;
    mixer = new THREE.AnimationMixer(model);

    numAnimations = animations.length;

    for (let i = 0; i !== numAnimations; ++i) {
      let clip = animations[i];
      const name = clip.name;

      if (baseActions[name]) {
        const action = mixer.clipAction(clip);
        activateAction(action);
        baseActions[name].action = action;
        allActions.push(action);
      } else if (additiveActions[name]) {
        // Make the clip additive and remove the reference frame

        THREE.AnimationUtils.makeClipAdditive(clip);

        if (clip.name.endsWith("_pose")) {
          clip = THREE.AnimationUtils.subclip(clip, clip.name, 2, 3, 30);
        }

        const action = mixer.clipAction(clip);
        activateAction(action);
        additiveActions[name].action = action;
        allActions.push(action);
      }
    }
  });
};

export { addModel2Scene, updateModel };
