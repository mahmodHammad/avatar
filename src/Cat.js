import React, { useState, useEffect, useRef } from "react";
import { sceneSetup, scene ,takeScreenshot} from "./setup";
import { startAnimationLoop } from "./Animate";
// import SH from "./ScreenShoot"

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
     <div className="box">

      <button className="SH" onClick={()=>takeScreenshot(1028*4 ,1028*4 )} className="SH">Download image</button>
</div>
    </React.Fragment>
  );
}

//clean up to prevent memory leak
//   componentWillUnmount() {
//     window.cancelAnimationFrame(requestID);
//     controls.dispose();
//   }
