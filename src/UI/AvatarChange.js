import React, { useState} from "react";
import { sceneSetup, scene } from "../setup";


export default function Cat({ handleFullScreen }) {
  

  return (
    <div className="box">
        <div className="title">Hair</div>
        <div className="change">
            <button className="l-btn btn">{`<`}</button>
            <span className="center">Short Hair</span>
            <button className="r-btn btn">{`>`}</button>
        </div>
    </div>
  );
}
