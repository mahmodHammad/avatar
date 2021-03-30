import React, { useState, useEffect, useRef } from "react";
import { sceneSetup, scene, changeSceneBackground } from "./setup";
import { startAnimationLoop } from "./Animate";

export default function AC() {
  const bgs = {
    gray: 0xaaaaaa,
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
    <div className="container">
      <button onClick={() => onBGChange(0)}>{`<`}</button>
      <span>{bgsNames[activeBGIndex]}</span>
      <button onClick={() => onBGChange(1)}>{`l`}</button>
    </div>
  );
}

//clean up to prevent memory leak
//   componentWillUnmount() {
//     window.cancelAnimationFrame(requestID);
//     controls.dispose();
//   }
