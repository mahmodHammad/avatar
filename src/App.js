import React from "react";
import "./App.css";
import Cat from "./Cat";
import AvatarChange from "./UI/AvatarChange"
function App() {
  return (
    <div>
      <div className="App">
        <div className="l-panel panel">
          <AvatarChange/>
          <AvatarChange/>
          <AvatarChange/>
        </div>
        <div className="r-panel panel">
          <AvatarChange/>
          <AvatarChange/>
          <AvatarChange/>
        </div>
        <Cat/>

      </div>
    </div>
  );
}

export default App;
