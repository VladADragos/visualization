import React, { useEffect } from "react";
import "./App.css";
import Canvas from "./canvas/Canvas";
import CellularAutomata from './cellularAutomata/CellularAutomata';
import { forEach } from "./utils/utils";
import Colors from './cellularAutomata/Colors';
import { setInterval } from "timers";
// import useEffect from 'react';
import CellularAutomataVisualizer from './cellularAutomata/CellularAutomataVisualizer';
import CellularAutomataComponent from './cellularAutomata/CellularAutomataComponent';
const App = (): JSX.Element =>
{
  return (
    <div className="App">
      <CellularAutomataComponent width={40} height={40} cellSize={10} />
    </div>
  );
};

export default App;
