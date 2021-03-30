import React ,{useState}from "react";
import "./App.css";
import AvatarChange from "./UI/AvatarChange"
import BGChange from "./AvatarChange"

// console.log("FUCK",face)
// console.log("FUCK2",hair)
// console.log("FUCK3",cloth)



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
  red: 0xff0000,
  green: 0x00ff00,
  blue: 0x0000ff,
};

var gluesethair ,gluesetface,gluesetcloth

function extract(atrr){
    console.log("HEY YOU FUCK",atrr)
    // face = atrr.face
    
   const {hair,face,cloth} = atrr
    gluesethair(hair)
    gluesetface(face)
    gluesetcloth(cloth)
    // cloth = atrr.cloth
    return atrr
}

function UI() {
const [hair, sethair] = useState(null);
const [face, setface] = useState(null);
const [cloth, setcloth] = useState(null);

gluesethair =sethair
gluesetface=setface
gluesetcloth = setcloth

  return (
      <React.Fragment>
        <div className="l-panel panel">
            {hair!==undefined?<AvatarChange title="Hair Color" mesh={hair}   colors={Colors}/>:null}
            {face!==undefined?  <AvatarChange title="Face Color" mesh={face}  colors={Colors}/>:null}

        </div>
         <div className="r-panel panel">
         {face!==undefined?<AvatarChange title="Cloth Color" mesh={cloth} colors={Colors}/> :null}
         <BGChange title="Background Color" mesh={cloth} colors={Colors}/> 

        </div> 
        </React.Fragment>
  );
}

export  {UI,extract};




