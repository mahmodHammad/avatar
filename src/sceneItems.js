import * as THREE from "three";
import { scene } from "./setup";
import { loadModel } from "./ModelLoader";
import { CSG } from "three-csg-ts";

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
  // Make 2 box meshes..


  loadModel(hat, { x: 0, y: 0, z: 0 }).then((body) => {
    console.log("hat", body.scene.children);
    // const meshA = body.scene.getChildByName("hair")
    const meshA = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshNormalMaterial());
    const meshB = new THREE.Mesh(new THREE.CylinderGeometry(4,1,4,100,300));
    
    // scene.add(body.scene)
    // scene.add(meshA)
    loadModel(earth, { x: 0, y: -0.2, z: 0 }).then((e) => {
      console.log("hair", body.scene.children[6]);
      // scene.add(e.scene);
    // const meshB = e.scene.getChildByName("hat")
  // scene.add(meshB)
      // Offset one of the boxes by half its width..
  
      // Make sure the .matrix of each mesh is current
      meshA.updateMatrix();
      meshB.updateMatrix();
  
      // // Create a bsp tree from each of the meshes
      const bspA = CSG.fromMesh(meshA);
      const bspB = CSG.fromMesh(meshB);
      
      // // // Subtract one bsp from the other via .subtract... other supported modes are .union and .intersect
      const bspResult = bspA.union(bspB);
      // console.log(bspResult)
      // scene.add(body.scene)
      // // // Get the resulting mesh from the result bsp
      const meshResult = CSG.toMesh(bspResult, meshA.matrix);
  
      // // // Set the results material to the material of the first cube.
      meshResult.material = meshA.material;
      scene.add(meshResult)
    });

    // scene.add(body.scene);
  });


  addLights();
};

export { addItem };
