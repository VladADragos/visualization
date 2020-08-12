import React from "react";
import "./App.css";
import CellularAutomataComponent from "./cellularAutomata/CellularAutomataComponent";
const App = (): JSX.Element => {
  return (
    <div className="App">
      <CellularAutomataComponent width={15} height={20} cellSize={20} />
    </div>
  );
};

export default App;
