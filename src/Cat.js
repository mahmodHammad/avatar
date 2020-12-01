import React, { useState, useEffect, useRef } from "react";
import { sceneSetup, scene } from "./setup";
import { startAnimationLoop } from "./Animate";

export default function Cat({ handleFullScreen }) {
  const textInput = useRef(null);

  useEffect(() => {
    const canvasTarget = textInput.current;
    sceneSetup(canvasTarget);
    startAnimationLoop();
  }, []);

  return (
    <React.Fragment>
      <div ref={textInput} className="canvas"></div>
    </React.Fragment>
  );
}

//clean up to prevent memory leak
//   componentWillUnmount() {
//     window.cancelAnimationFrame(requestID);
//     controls.dispose();
//   }
