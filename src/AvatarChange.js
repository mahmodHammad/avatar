import React, { useState, useEffect, useRef } from "react";
import { sceneSetup, scene, changeSceneBackground ,takeScreenshot ,render} from "./setup";


export default function AC({ title , mesh , colors  }) {
  const bgs = {
    yellow:0xFFEB3B,
    gray: 0xaaaaaa,
    Green1:0x69F0AE,
    cyan:0x00E5FF,
    Teal:0x1DE9B6,
    Purple:0x651FFF,
    indigo:0x3D5AFE,
    coolRed:0xFF1744,
    Pink:0xF50057,
    red: 0xff0000,
    green: 0x00ff00,
    blue: 0x0000ff,
  };
  const bgsNames = Object.keys(bgs);

  const [activeBGIndex, setactiveBGIndex] = useState(0);
  useEffect(() => {
    changeSceneBackground(bgs[bgsNames[activeBGIndex]]);
  }, []);

  function syencChangeBackground(index) {
    setactiveBGIndex(index);
    changeSceneBackground(bgs[bgsNames[index]]);
    render()
  }

  function onBGChange(index) {
    //   index == 1 => left , index==0 => right

    if (index) {
      activeBGIndex < bgsNames.length - 1
        ? syencChangeBackground(activeBGIndex + 1)
        : syencChangeBackground(0);
    } else {
        activeBGIndex > 0
        ? syencChangeBackground(activeBGIndex - 1)
        : syencChangeBackground(bgsNames.length - 1);
    }
  }

  return (
      
    <div className="box">
        <div className="title">{title}</div>
        <div className="change">
            <button className="l-btn btn" onClick={()=>onBGChange(0)}>{`<`}</button>
            <span className="center">{bgsNames[activeBGIndex]}</span>
            <button className="r-btn btn" onClick={()=>onBGChange(1)}>{`>`}</button>
        </div>
    </div>
    // <div className="container">
    //   <button onClick={() => onBGChange(0)}>{`<`}</button>
    //   <span className="title">{bgsNames[activeBGIndex]}</span>
    //   <button onClick={() => onBGChange(1)}>{`>`}</button>
      // <button onClick={()=>takeScreenshot(2000 ,2000 )} className="SH">Take SH</button>
    // </div>
  );
}


//clean up to prevent memory leak
//   componentWillUnmount() {
//     window.cancelAnimationFrame(requestID);
//     controls.dispose();
//   }
