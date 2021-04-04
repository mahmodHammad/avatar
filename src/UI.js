import React ,{useState}from "react";
import "./App.css";
import AvatarChangeColor from "./UI/AvatarChangeColor"
import AvatarChangeVisible from "./UI/AvatarChangeVisible"

import BGChange from "./AvatarChange"
import {render} from "./setup"


const hairColors={
  indigo:0x3D5AFE,
  red:0xff5050,
  Purple:0x651FFF,
  gray:0x282828,
  lol:0xdc95dc,
  "light blue":0xb4cdff,
  pink:0xfe5caa,
  cyan:0x3264c8
}
const faceColors={
    Skin1:0xc58c85,
    Skin2:0xecbcb4,
    Skin3:0xd1a3a4,
    Skin4:0xa1665e,
    Skin5:0x503335,
    Skin6:0x592f2a,
}

const clothColors={
    gray: 0x888888,
    Green1:0x69F0AE,
    Purple:0x651FFF,
    indigo:0x3D5AFE,
    coolRed:0xFF1744,
}

const Colors ={
  yellow:0xFFEB3B,
  gray: 0xaaaaaa,
  Green1:0x69F0AE,
  cyan:0x00E5FF,
  Teal:0x1DE9B6,
  Purple:0x651FFF,
  indigo:0x3D5AFE,
  coolRed:0xFF1744,
  Pink:0xF50057,

};



var gluesethair ,gluesetface,gluesetcloth,gluesethat,gluesethair_mask

function extract(atrr){
    console.log("HEY YOU FUCK",atrr)
    // face = atrr.face
    
   const {hair,face,cloth,hat,hair_mask} = atrr
    gluesethair(hair)
    gluesetface(face)
    gluesetcloth(cloth)
    gluesethat(hat)
    gluesethair_mask(hair_mask)
    // cloth = atrr.cloth
    return atrr
}

function UI() {
const [hair, sethair] = useState(undefined);
const [hat, sethat] = useState(undefined);
const [face, setface] = useState(null);
const [cloth, setcloth] = useState(undefined);
const [hair_mask, sethair_mask] = useState(undefined);

gluesethair =sethair
gluesetface=setface
gluesetcloth = setcloth
gluesethat = sethat
gluesethair_mask = sethair_mask

const Allhairs={
  bold:{visible:[]},
  hair:{visible:[hair]},
  hat:{visible:[hat,hair_mask]}
}

  return (
      <React.Fragment>
        <div className="l-panel panel">
             {/* {hair!==undefined?<AvatarChangeColor title="Hair Color" mesh={hair}   colors={hairColors}/>:null} */}

        </div>
         <div className="r-panel panel">
         {/* {cloth!==undefined?<AvatarChangeColor title="Cloth Color" mesh={cloth} colors={clothColors}/> :null} */}
            {face!==undefined?  <AvatarChangeColor title="Face Color" mesh={face}  colors={faceColors}/>:null} 
          <AvatarChangeVisible title="hair style" Allmeshes={Allhairs}/>
         <BGChange title="Background Color" mesh={cloth} colors={Colors}/> 
        </div> 
        </React.Fragment>
  );
}

export  {UI,extract};




