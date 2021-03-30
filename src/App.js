import React from "react";
import "./App.css";
import Cat from "./Cat";
import {UI} from "./UI"

function App() {
  return (
    <div>
      <div className="App">
        <UI/>    
        <Cat/>
      </div>
    </div>
  );
}

export default App;
