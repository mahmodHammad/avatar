import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { displayCoards } from "./helpers.js";
import settings from "./settings.js";
import Stats from "stats-js";
import { addItem } from "./sceneItems";
import {saveDataURI,defaultFileName} from "./ScreenShot"

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
let composer1, composer2, fxaaPass;

THREE.Cache.enabled = true;

const stats = new Stats();

let width = window.innerWidth;
let height = window.innerHeight;
// ----------------------------------------------> render
const renderer = new THREE.WebGLRenderer({
  // powerPreference: "high-performance",
  antialias: false,
  logarithmicDepthBuffer:false
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 

renderer.setPixelRatio(settings.quality);
function render() {
  renderer.render(scene, camera);
}
// ----------------------------------------------> scene
const scene = new THREE.Scene();

function changeSceneBackground(color) {
  scene.background = new THREE.Color(color);
}
changeSceneBackground(0x000000);
// ----------------------------------------------> camera
const camera = new THREE.PerspectiveCamera(
  40, // fov = field of view
  1, // aspect ratio
  0.001, // near plane
  80000 // far plane
);

camera.position.set(0, 0, 8);

// ----------------------------------------------> controls

const controls = new OrbitControls(camera, renderer.domElement);
function setupControls(speed) {
  let ctrSpeed = speed || settings.ctrlSpeed;
  controls.zoomSpeed = ctrSpeed/2;
  controls.panSpeed = ctrSpeed;
  controls.rotateSpeed = ctrSpeed;

  controls.target = new THREE.Vector3(0, 0, 0);

  controls.maxDistance = settings.maxZoom;
  controls.minDistance = settings.minZoom;

  controls.maxPolarAngle = settings.maxPolarAngle;
  controls.minPolarAngle = settings.minPolarAngle;

  controls.autoRotate = settings.autoRotate;
  controls.autoRotateSpeed = settings.autoRotateSpeed;

  // controls.enableDamping = true;
  // controls.dampingFactor = 0.05;

  controls.enableRotate = false;
  controls.enabled=false
}

// ----------------------------------------------> resize
const handleWindowResize = () => {
  width = window.innerWidth;
  height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect =1;
  camera.updateProjectionMatrix();
  composer1.render();
  // composer2.render();
  // render()

};
// ----------------------------------------------> setup
const sceneSetup = (root) => {
  renderer.setSize(width, height);
  root.appendChild(renderer.domElement);
  window.addEventListener("resize", handleWindowResize);
  if (settings.developmentModel) {
    displayCoards();
  }
  setupControls();

  if (settings.developmentModel) {
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);
  }
  
  addItem();
};

function takeScreenshot(width, height) {
  // set camera and renderer to desired screenshot dimension
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);

  renderer.render(scene, camera, null, false);

  const DataURI = renderer.domElement.toDataURL("image/png");

  // save
  saveDataURI(defaultFileName(".png"), DataURI);

  // reset to old dimensions by invoking the on window resize function
   handleWindowResize();
}

const renderPass = new RenderPass( scene, camera );
fxaaPass = new ShaderPass( FXAAShader );

				const pixelRatio = renderer.getPixelRatio();

				fxaaPass.material.uniforms[ 'resolution' ].value.x = 1/1024*4;
				fxaaPass.material.uniforms[ 'resolution' ].value.y = 1/1024*4;

				composer1 = new EffectComposer( renderer );
				composer1.addPass( renderPass );
				composer1.addPass( fxaaPass );

        const copyPass = new ShaderPass( CopyShader );

				composer2 = new EffectComposer( renderer );
				composer2.addPass( renderPass );
				composer2.addPass( copyPass );

export {
  sceneSetup,
  scene,
  controls,
  render,
  camera,
  stats,
  changeSceneBackground,
  takeScreenshot,
};
