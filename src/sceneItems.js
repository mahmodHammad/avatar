import * as THREE from "three";
import { scene } from "./setup";
import { loadModel } from "./ModelLoader";
const earth = require("./earth.glb").default;

function addLights() {
  const amplight = new THREE.AmbientLight("#ffffff", 0.9);
  let lightBack = new THREE.SpotLight(0xffffff, 1);
  let lightFront = new THREE.SpotLight(0xffffff, 1);
  lightBack.position.set(2, 50, -7);
  lightFront.position.set(-2, -30, 7);

  scene.add(amplight);
  scene.add(lightBack);
  scene.add(lightFront);

  scene.add( new THREE.SpotLightHelper(lightBack,"#ff00cc") );
  scene.add( new THREE.SpotLightHelper( lightFront ,"#ccff00"));
}

const addItem = () => {
  loadModel(earth , {x:1,y:0,z:0})
    .then((e) => {
      scene.add(e.scene);
    })
  addLights();
};

export { addItem };
