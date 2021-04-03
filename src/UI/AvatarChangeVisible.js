import * as THREE from "three";
import React, { useState,useEffect} from "react";
import { sceneSetup, scene ,render} from "../setup";

function hideAllhair(hairs){
    const meshNames = Object.keys(hairs);
     meshNames.forEach(meshname=>{
      hairs[meshname].visible.forEach(hvisible=> hvisible.visible=false)
    })    
  }

  function show(hairs,hair){
      console.log(hairs,hair)
    hideAllhair(hairs)
    hair.visible.forEach(hvisible=>{
        hvisible.visible=true
    })
    render()
  }

export default function AvatarVisible({ title , Allmeshes   }) {
  const meshNames = Object.keys(Allmeshes);

  const [activeMeshIndex, setactiveMeshIndex] = useState(0);
  useEffect(() => {
    // changeColor(mesh,Allmeshes[meshNames[activeMeshIndex]])
    // syencChangeBackground(0)
    // changeSceneBackground(Allmeshes[meshNames[activeMeshIndex]]);
  }, []);

  function syencChangeBackground(index) {
    setactiveMeshIndex(index);
    show(Allmeshes,Allmeshes[meshNames[index]])
    render()

    // changeSceneBackground(Allmeshes[meshNames[index]]);
  }

  function handleChange(index) {
    //   index == 1 => left , index==0 => right
    if (index) {
      activeMeshIndex < meshNames.length - 1
        ? syencChangeBackground(activeMeshIndex + 1)
        : syencChangeBackground(0);
    } else {
        activeMeshIndex > 0
        ? syencChangeBackground(activeMeshIndex - 1)
        : syencChangeBackground(meshNames.length - 1);
    }
  }


  return (
    
    <div className="box">
        <div className="title">{title}</div>
        <div className="change">
            <button className="l-btn btn" onClick={()=>handleChange(1)}>{`<`}</button>
            <span className="center">{meshNames[activeMeshIndex]}</span>
            <button className="r-btn btn" onClick={()=>handleChange(0)}>{`>`}</button>
        </div>
    </div>
  );
}
