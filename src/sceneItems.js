import * as THREE from "three";
import { scene } from "./setup";
import { loadModel } from "./ModelLoader";
const hat = require("./Example_all feature.glb").default;
const earth = require("./Example_hat only.glb").default;

function addLights() {
  const amplight = new THREE.AmbientLight("#ffffff", 1);
  let lightBack = new THREE.SpotLight(0xffffff, 1);
  let lightFront = new THREE.SpotLight(0xffffff, 1.3);
  lightBack.position.set(-10, -1, -7);
  lightFront.position.set(20, 30, 20);

  scene.add(amplight);
  scene.add(lightBack);
  scene.add(lightFront);

  // scene.add( new THREE.SpotLightHelper(lightBack,"#ff00cc") );
  // scene.add( new THREE.SpotLightHelper( lightFront ,"#ccff00"));
}

const addItem = () => {
  loadModel(earth , {x:0,y:0,z:0})
    .then((e) => {
      console.log("FFFF",e)
      scene.add(e.scene);
    })
    loadModel(hat , {x:0,y:-0.2,z:0})
    .then((e) => {
      console.log("FFFF",e)
      scene.add(e.scene);
    })
   
  addLights();
};

export { addItem };
