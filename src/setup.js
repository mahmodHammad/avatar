import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { displayCoards } from "./helpers.js";
import settings from "./settings.js";
import Stats from "stats-js";
import { addItem } from "./sceneItems";
import {saveDataURI,defaultFileName} from "./ScreenShot"
// ffffffff
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
// ffffffff
// try this 
// https://codepen.io/discoverthreejs/pen/xxGxBRm


THREE.Cache.enabled = true;

// var app = createOrbitViewer({
//   clearColor: 'rgb(40, 40, 40)',
//   clearAlpha: 1.0,
//   fov: 55,
//   position: new THREE.Vector3(0, 2, -2)
// })

// add a default background


let width = window.innerWidth;
let height = window.innerHeight;
// ----------------------------------------------> render
const renderer = new THREE.WebGLRenderer({
  powerPreference: "high-performance",
  antialias: true,
  logarithmicDepthBuffer:true,
  preserveDrawingBuffer: true
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.shadowMap.type = THREE.VSMShadowMap; 

// renderer.physicallyCorrectLights = true;
renderer.outputEncoding =  THREE.sRGBEncoding;
// renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMapping = THREE.CineonToneMapping;
renderer.toneMappingExposure = 1;
renderer.setPixelRatio(settings.quality);


// export const NoToneMapping: ToneMapping;
// export const LinearToneMapping: ToneMapping;
// export const ReinhardToneMapping: ToneMapping;
// export const CineonToneMapping: ToneMapping;
// export const ACESFilmicToneMapping: ToneMapping;
// renderer.toneMapping = THREE.ReinhardToneMapping;


// ----------------------------------------------> scene
const scene = new THREE.Scene();

function changeSceneBackground(color) {
BackgroundPlanematerial.color.set(color)

  // scene.background = new THREE.Color(color);
}
const BackgroundPlanematerial = new THREE.MeshPhongMaterial( {color: 0x333333, side: THREE.DoubleSide } );
function addPlane(){
  const geometry = new THREE.PlaneGeometry( 20, 20, 32 );
const plane = new THREE.Mesh( geometry, BackgroundPlanematerial );
plane.position.set(0,0,-15)
// scene.add( plane );
}
addPlane()

const stats = new Stats();
// ----------------------------------------------> camera
	const camera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 0.1, 700 );
				camera.position.z = 100;

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

  // controls.autoRotate = true;
  // controls.autoRotateSpeed = 2;

  // controls.enableDamping = true;
  // controls.dampingFactor = 0.05;

  controls.enableRotate = true;
  controls.enabled=true 
}

// ----------------------------------------------> resize
const handleWindowResize = () => {
  width = window.innerWidth;
  height = window.innerHeight;

  renderer.setSize( width, height );
				composer.setSize( width, height );
  camera.aspect =1;
  camera.updateProjectionMatrix();
  render()
};
// ----------------------------------------------> setup
const sceneSetup = (root) => {
  renderer.setSize(width, height);

  composer.setSize( width, height );

  root.appendChild(renderer.domElement);
  window.addEventListener("resize", handleWindowResize);
  if (settings.developmentModel) {
    displayCoards();
  }
  setupControls();

  if (settings.developmentModel) {
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    // document.body.appendChild(stats.dom);
  }
  addItem();
changeSceneBackground(0xaaaaaa);

};


function takeScreenshot(width, height) {
  // set camera and renderer to desired screenshot dimension
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);

  composer.render();

  const DataURI = composer.renderer.domElement.toDataURL("image/png");
  console.log("RENDERER",renderer)
  console.log("COMPOSER",composer.renderer)
  // save
  saveDataURI(defaultFileName(".png"), DataURI);

  // reset to old dimensions by invoking the on window resize function
   handleWindowResize();
}


const glitchPass = new GlitchPass();
// composer.addPass( glitchPass );



      const fbox = new THREE.BoxGeometry(10,10,10)
      const fmesh = new THREE.Mesh(fbox,new THREE.MeshBasicMaterial({color:0xff0000}))
      scene.add(fmesh)


   width = window.innerWidth;
   height = window.innerHeight;

   const renderPass = new RenderPass( scene, camera );
   const composer = new EffectComposer( renderer );
   composer.addPass( renderPass );


  const ssaoPass = new SSAOPass( scene, camera, width, height );
  ssaoPass.kernelRadius = 16;
  composer.addPass( ssaoPass );

        
        // composer.renderTarget1.texture.encoding = THREE.sRGBEncoding;
        // composer.renderTarget2.texture.encoding = THREE.sRGBEncoding;

function render() {
  // renderer.render(scene, camera);
  composer.render();

}


function addGUI(){
  const gui = new GUI();

				gui.add( ssaoPass, 'output', {
					'Default': SSAOPass.OUTPUT.Default,
					'SSAO Only': SSAOPass.OUTPUT.SSAO,
					'SSAO Only + Blur': SSAOPass.OUTPUT.Blur,
					'Beauty': SSAOPass.OUTPUT.Beauty,
					'Depth': SSAOPass.OUTPUT.Depth,
					'Normal': SSAOPass.OUTPUT.Normal
				} ).onChange( function ( value ) {

					ssaoPass.output = parseInt(value );

				} );
				gui.add( ssaoPass, 'kernelRadius' ).min( 0 ).max( 32 );
				gui.add( ssaoPass, 'minDistance' ).min( 0.001 ).max( 0.02 );
				gui.add( ssaoPass, 'maxDistance' ).min( 0.01 ).max( 3 );
}
addGUI()
export {
  sceneSetup,
  scene,
  controls,
  render,
  renderer,
  camera,
  stats,
  changeSceneBackground,
  takeScreenshot,
  composer
};
