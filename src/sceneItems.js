import * as THREE from "three";
import { scene } from "./setup";
import { loadModel } from "./ModelLoader";
import {extract} from "./UI"
const hat = require("./Example_all feature.glb").default;
const earth = require("./Avatar3.glb").default;
var face, hair, cloth

function addLights() {
  const amplight = new THREE.AmbientLight("#ffffff", 1);
  let lightBack = new THREE.SpotLight(0xffffff, 1);
  let lightFront = new THREE.SpotLight(0xffffff, 1);
  lightBack.castShadow = true
  lightFront.castShadow = true
  lightBack.position.set(-10, 0, -7);
  lightFront.position.set(20, 30, 20);

  scene.add(amplight);
  scene.add(lightBack);
  scene.add(lightFront);

  // scene.add( new THREE.SpotLightHelper(lightBack,"#ff00cc") );
  // scene.add( new THREE.SpotLightHelper( lightFront ,"#ccff00"));
}


function extractPart(){
}

const addItem = () => {
  loadModel(earth , {x:0,y:0,z:0})
    .then((e) => {
      function extractMesh(name){
        return e.scene.getChildByName(name)
      }
   
      cloth = extractMesh("cloth")
       face = extractMesh("face")
       hair = extractMesh("hair")
       extract({cloth,face,hair})
       console.log("face lol",face)
      const bg  = extractMesh("bg")
      const hair_mask = extractMesh("hair_mask")
      const hat = extractMesh("hat")
      const hat_mask = extractMesh("hat_mask")
      const tounge = extractMesh("Roundcube006")
      tounge.material.color = new THREE.Color(0xdd2222)
      face.material.color = new THREE.Color(0xc58c85)
      cloth.material.color = new THREE.Color(0x888888)
      hair.material.color = new THREE.Color(0x3D5AFE)
       

      bg.visible = false
      hair_mask.visible = false
      hat.visible = false
      hat_mask.visible = false

      console.log("FFFF",e.scene.children)
      scene.add(e.scene);
    })
  addLights();
};

export { addItem ,face, hair, cloth , extractPart};
