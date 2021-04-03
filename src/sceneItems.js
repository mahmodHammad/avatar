import * as THREE from "three";
import { scene ,render,renderer} from "./setup";
import { loadModel } from "./ModelLoader";
import {extract} from "./UI"
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

// const hat = require("./Example_all feature.glb").default;
// const earth = require("./Avatar3.glb").default;
const earth = require("./Avatar5.glb").default;
// const earth = require("./model/f.glb").default;
const hdrbg = require("./model/Texture/courtyard_2k.hdr")
var face, hair, cloth

function addBacklight(){
    const tl = new THREE.PointLight(0xffffff,0.4)
    const bl = new THREE.PointLight(0xffffff,0.4)
    const tr = new THREE.PointLight(0xffffff,0.2)
    const br = new THREE.PointLight(0xffffff,0.2)
    const xd = 3
    const zd = 4
    const yd = 3
    const rightShift = 1
    tl.position.set(xd+rightShift,yd+rightShift,-zd)
    tr.position.set(-xd+rightShift,yd+rightShift,-zd)
    bl.position.set(xd+rightShift,-yd+rightShift,-zd)
    br.position.set(-xd+rightShift,-yd+rightShift,-zd)

    tl.castShadow = true
    tr.castShadow = true
    bl.castShadow = true
    br.castShadow = true
  
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
  dirLight.position.set( 3, 2.5, 4 );
  dirLight.castShadow = true;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 500;
  const lightDist = 17
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
  // addBacklight()
  setHDRLighting()
  setDirectionalLighting()

  const rectLight = new THREE.PointLight( 0xffffff,1 );
  rectLight.position.set( 0, -3, 5 );
  rectLight.lookAt( 0, 0, 0 );
// scene.add(rectLight)
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
      // const bg  = extractMesh("bg")
      const hair_mask = extractMesh("hair_mask")

      const hat = extractMesh("hat")
      // const hat_mask = extractMesh("hat_mask")
      // const tounge = extractMesh("Roundcube006")
      const nose = extractMesh("nose")
      // const nech = extractMesh("Cylinder")
      // const ear = extractMesh("Roundcube001")
      const eye = extractMesh("eye")
      const eyebrow = extractMesh("eyebrows")


      // cloth.castShadow = true; 
      // cloth.receiveShadow = true;
      // cloth.material.color = new THREE.Color(0x888888)


      // face.castShadow = true; 
      face.receiveShadow = true;
      // face.material.color = new THREE.Color(0xc58c85)

       hair.castShadow = true; 
      //  hair.material.roughness = 0.5
      //  hair.receiveShadow = false;
      // hair.material.color = new THREE.Color(0x3D5AFE)
      
      nose.castShadow = true; 

      // tounge.receiveShadow = true
      // tounge.material.color = new THREE.Color(0xaa5555)

      // ear.receiveShadow = true
      // nech.receiveShadow =true
      // eyebrow.receiveShadow = true
      eyebrow.castShadow = true
      eye.castShadow = true
      
    // face.material = new THREE.MeshPhongMaterial( { 
    //     // color: 0x996633,
    //     // envMap: envMap, // optional environment map
    //     specular: 0x050505,
    //     shininess: 100
    // } ) 
    // face.material.roughness = 0
    // cloth.material.roughness = 0
    face.material.skinning = true
      // eye.material.color = new THREE.Color(0x333333)
      // eyebrow.material.color = new THREE.Color(0x444444)
      // bg.visible = false
      // hat_mask.visible = false

      // overlay start
      hat.castShadow = true
      hair_mask.castShadow=false
      hair_mask.receiveShadow = true
      hair_mask.castShadow = true
      hair_mask.visible =false
      hat.visible = false
      hair.visible= false
      console.log("hair",hair)

      scene.add(e.scene);
      extract({cloth,face,hair,hair_mask,hat})

      render()
    })
  addLights();
};

export { addItem ,face, hair, cloth };
