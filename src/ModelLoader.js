import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
dracoLoader.setDecoderConfig({ type: "js" });

const modelLoader = new GLTFLoader();
modelLoader.setDRACOLoader(dracoLoader);

function loadModel(filepath,pos) {
  const {x,y,z} = pos

  return new Promise((resolve, reject) => {
    modelLoader.load(
      filepath,
      function (gltf) {
        // gltf.scene.scale.setX(0.1)
        // gltf.scene.scale.setY(0.1)
        // gltf.scene.scale.setZ(0.1)

        gltf.scene.position.setX(x)
        gltf.scene.position.setY(y)
        gltf.scene.position.setZ(z)
        resolve(gltf);
      },
      function (xhr) {
        // console.log("loading", xhr);
      },
      function (error) {
        console.log("ERROR on loading model", error);
        reject(error);
      }
    );
  });
}

export { loadModel };
