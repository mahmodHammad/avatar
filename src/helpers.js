import * as THREE from "three";
import { scene } from "./setup";

const gridsize = 10;
const gridDivisions = 100;
function displayCoards() {
  scene.add(new THREE.AxesHelper(20));
  scene.add(new THREE.GridHelper(gridsize, gridDivisions, "green", "green"));
  scene.add(
    new THREE.GridHelper(gridsize, gridDivisions, "blue", "blue").rotateX(
      Math.PI / 2
    )
  );
  scene.add(
    new THREE.GridHelper(gridsize, gridDivisions, "red", "red").rotateZ(
      Math.PI / 2
    )
  );
}

function getExactPosition(target) {
  const { shift, direction } = target;
  let exactPositions = shift.map((s) => {
    return new THREE.Vector3(s.x, s.y, s.z);
  });

  let helperPosition = new THREE.Vector3(direction.x, direction.y, direction.z);

  return { exactPositions, helperPosition, direction };
}

export { displayCoards, getExactPosition };
