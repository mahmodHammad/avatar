import * as THREE from "three";
import React, { useState,useEffect} from "react";
import { sceneSetup, scene } from "../setup";

function changeColor(mesh,color){
  console.log("Change color", mesh)
  mesh.material.color = new THREE.Color(color)
}

// changeColor(cloth,0xf07f7f)
// changeColor(cloth,0x714141)
// changeColor(hair,0x4e1325)
// changeColor(face,0xa5977e)

export default function Cat({ title , mesh , colors  }) {
  const colNames = Object.keys(colors);

  const [activeBGIndex, setactiveBGIndex] = useState(0);
  useEffect(() => {
    // changeColor(mesh,colors[colNames[activeBGIndex]])
    // changeSceneBackground(colors[colNames[activeBGIndex]]);
  }, []);

  function syencChangeBackground(index) {
    setactiveBGIndex(index);
    changeColor(mesh,colors[colNames[index]])

    // changeSceneBackground(colors[colNames[index]]);
  }

  function handleChange(index) {
    //   index == 1 => left , index==0 => right

    if (index) {
      activeBGIndex < colNames.length - 1
        ? syencChangeBackground(activeBGIndex + 1)
        : syencChangeBackground(0);
    } else {
        activeBGIndex > 0
        ? syencChangeBackground(activeBGIndex - 1)
        : syencChangeBackground(colNames.length - 1);
    }
  }


  return (
    <div className="box">
        <div className="title">{title}</div>
        <div className="change">
            <button className="l-btn btn" onClick={()=>handleChange(1)}>{`<`}</button>
            <span className="center">{colNames[activeBGIndex]}</span>
            <button className="r-btn btn" onClick={()=>handleChange(0)}>{`>`}</button>
        </div>
    </div>
  );
}
