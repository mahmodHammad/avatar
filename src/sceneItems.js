import * as THREE from "three";
import { scene ,render,renderer} from "./setup";
import { loadModel } from "./ModelLoader";
import {extract} from "./UI"
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

// const hat = require("./Example_all feature.glb").default;
// const earth = require("./Avatar3.glb").default;
// const earth = require("./Avatar5.glb").default;
const earth = require("./new.glb").default;
// const earth = require("./model/f.glb").default;
// const hdrbg = require("./model/Texture/courtyard_2k.hdr")
const hdrbg = require("./model/Texture/hdr.hdr")
var face, hair, cloth

function addBacklight(){
    const tl = new THREE.PointLight(0xffffff,0.3)
    const bl = new THREE.PointLight(0xffffff,0.3)
    const tr = new THREE.PointLight(0xffffff,0.4)
    const br = new THREE.PointLight(0xffffff,0.3)
    const xd = 6
    const zd = 7
    const yd = 8
    const rightShift = 1
    tl.position.set(-xd+rightShift,yd+rightShift,-zd)
    tr.position.set(xd+rightShift,yd+rightShift,-zd)
    bl.position.set(xd+rightShift,-yd+rightShift,-zd)
    br.position.set(-xd+rightShift,-yd+rightShift,-zd)

    // tl.castShadow = true
    tr.castShadow = true
    // bl.castShadow = true
    // br.castShadow = true
  
  scene.add(tl)
  scene.add(tr)
  scene.add(bl)
  scene.add(br)

// scene.add(new THREE.PointLightHelper(tl))
// scene.add(new THREE.PointLightHelper(tr))
// scene.add(new THREE.PointLightHelper(bl))
// scene.add(new THREE.PointLightHelper(br))
}


function setHDRLighting(){
  new RGBELoader()
  .setDataType( THREE.UnsignedByteType ) // alt: FloatType, HalfFloatType
  .load( hdrbg.default, function ( texture, textureData ) {
    var envMap = pmremGenerator.fromEquirectangular( texture ).texture;
    // scene.background = envMap;
    scene.environment = envMap;
    texture.dispose();
    pmremGenerator.dispose();
    render();
  } );
  var pmremGenerator = new THREE.PMREMGenerator( renderer );
  pmremGenerator.compileEquirectangularShader();
}

function setDirectionalLighting(){
  const dirLight = new THREE.DirectionalLight( 0xdddddd, 0.6 );
  dirLight.position.set( 2, 1.8, 4 );
  dirLight.castShadow = true;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 500;
  const lightDist = 20
  dirLight.shadow.camera.right = lightDist;
  dirLight.shadow.camera.left = - lightDist;
  dirLight.shadow.camera.top	= lightDist;
  dirLight.shadow.camera.bottom = - lightDist;
  dirLight.shadow.mapSize.width = 512*4;
  dirLight.shadow.mapSize.height = 512*4;
  dirLight.shadow.radius = 4;
  // dirLight.shadow.bias = - 0.0005;
  scene.add( dirLight );
}

function addLights() {
  addBacklight()
  setHDRLighting()
  setDirectionalLighting()

  const rectLight = new THREE.RectAreaLight( 0xffffff,0.2,8,8 );
  rectLight.position.set( 0, -4, 5 );
  rectLight.lookAt( 0, 0, 0 );
scene.add(rectLight)
}

const addItem = () => {
  loadModel(earth , {x:0,y:0,z:0})
    .then((e) => {
      console.log(e)
      function extractMesh(name){
        return e.scene.getChildByName(name)
      }
   
      const head = extractMesh("Head_01_BASE")
      const nose = extractMesh("Nose_01")
      const ear = extractMesh("Ears_01")
      const eye = extractMesh("Eye_01")
      const Sunglasses =extractMesh("Sunglasses01")
      const Sunglasses_glass =Sunglasses.getChildByName("Plane002_1")
      const Sunglasses_frame =Sunglasses.getChildByName("Plane002")
      const hair = extractMesh("Hair_01")
      const cloth = extractMesh("Cloth_01")
      const Mouth = extractMesh("Head_01_Mouth_01")
      const face = Mouth.getChildByName("Roundcube021_2")
      extract({face})


      head.visible = false
      hair.castShadow = true
      // Sunglasses_glass.visible=false
      // Sunglasses_glass.castShadow = true
      Sunglasses_glass.material.metalness = 1
      Sunglasses_glass.material.color =new THREE.Color(0xff1111)
      Sunglasses_glass.material.metalness = 0.8

      Sunglasses_frame.castShadow = true
      ear.receiveShadow = true
      nose.castShadow = true
      eye.castShadow = true
      cloth.castShadow = true
      // face.castShadow = true

      console.log(e.scene.children)

      
      e.scene.traverse(l=>{
        if(l.isMesh ){
          l.receiveShadow = true
        }
      })

      nose.receiveShadow = false
      ear.castShadow = false
      scene.add(e.scene);
      // extract({cloth,face,hair,hair_mask,hat})

      render()
    })
  addLights();
};

export { addItem ,face, hair, cloth };
