import React from "react";
import "./App.css";
import CellularAutomataComponent from "./cellularAutomata/CellularAutomataComponent";
const App = (): JSX.Element => {
  let size = 8**2;
  return (
    <div className="App">
      <CellularAutomataComponent width={size} height={size*3} cellSize={4} />
    </div>
  );
};

export default App;
