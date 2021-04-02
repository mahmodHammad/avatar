import * as THREE from "three";
import { scene ,render} from "./setup";
import { loadModel } from "./ModelLoader";
import {extract} from "./UI"
// const hat = require("./Example_all feature.glb").default;
// const earth = require("./Avatar3.glb").default;
// const earth = require("./model/GLB/Avatar (ALL)_GLB.glb").default;
const earth = require("./model/f.glb").default;

var face, hair, cloth

function addLights() {
  const amplight = new THREE.AmbientLight("#ffffff", 0.1);
  let lightBack = new THREE.SpotLight(0xffffff, 1.4);
  let lightFront = new THREE.SpotLight(0xffffff, 2);
  let light3 = new THREE.SpotLight(0xffffff, 0.6);
  lightBack.castShadow = false
  lightFront.castShadow = true




  const rectLight = new THREE.RectAreaLight( 0xffffff, 2.4,  10, 10 );
  rectLight.position.set( 0, 0, 5 );
  rectLight.lookAt( 0, 0, 0 );
  scene.add( rectLight )
  
  // const rectLightHelper = new THREE.RectAreaLightHelper( rectLight );
  // rectLight.add( rectLightHelper );


  // lightFront.shadow.bias = -0.0001;
  lightFront.shadow.mapSize.width = 1024*16; // default
lightFront.shadow.mapSize.height = 1024*16; // default


lightBack.shadow.mapSize.width =  1024*16; // default
lightBack.shadow.mapSize.height =  1024*16; // default


lightFront.shadow.camera.near = 0.1; // default
lightFront.shadow.camera.far = 500; // default
lightFront.shadow.focus = 0.5; // default

  lightBack.position.set(-10, 9,6);
  lightFront.position.set(5, 10, 14);
  light3.position.set(20, 30, -4);


  scene.add(amplight);
  scene.add(lightBack);
  scene.add(lightFront);
  scene.add(light3)

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
       console.log(cloth)

       hair.material.roughness = 0.5
      // cloth.scale.set(1.3,1,1.8)
      // (new THREE.Vector3(2,2,2))
      // //  cloth.castShadow = true; 
      //  cloth.receiveShadow = true;

        // face.castShadow = true; 
       face.receiveShadow = true;
      // //  face.material.wireframe = true

       hair.castShadow = true; 
      //  hair.receiveShadow = false;
face.material.roughness=0.5
cloth.material.roughness=0.6

      // //  sphere.castShadow = true; 
      // //  sphere.receiveShadow = true;

      //  extract({cloth,face,hair})
      //  console.log("face lol",face)
      // const bg  = extractMesh("bg")
      // const hair_mask = extractMesh("hair_mask")
      // const hat = extractMesh("hat")
      // const hat_mask = extractMesh("hat_mask")
      // const tounge = extractMesh("Roundcube006")
      // const nose = extractMesh("nose")
      // const nech = extractMesh("Cylinder")
      // const ear = extractMesh("Roundcube001")
      // const eye = extractMesh("eye")
      // const eyebrow = extractMesh("eyebrow")
      
      // nose.castShadow = true; 
      // tounge.receiveShadow = true

      // ear.receiveShadow = true
      // nech.receiveShadow =true
      // eyebrow.receiveShadow = true
      // eyebrow.castShadow = true

      // tounge.material.color = new THREE.Color(0xaa5555)
      // face.material.color = new THREE.Color(0xc58c85)
      // cloth.material.color = new THREE.Color(0x888888)
      // hair.material.color = new THREE.Color(0x3D5AFE)
      // eye.material.color = new THREE.Color(0x333333)
      // eyebrow.material.color = new THREE.Color(0x444444)
       

      // bg.visible = false
      // hair_mask.visible = false
      // hat.visible = false
      // hat_mask.visible = false


      console.log("FFFF",e.scene.children)

      // overlay start
      const hat = extractMesh("hat")
      const hair_mask = extractMesh("hair_mask")
      // hair_mask.visible =false
      // hat.visible = false
      // const hair = extractMesh("hair")
      console.log("hair",hair)

      scene.add(e.scene);
      render()
    })
  addLights();
};

export { addItem ,face, hair, cloth , extractPart};
