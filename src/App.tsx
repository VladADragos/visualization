import React, { useEffect } from "react";
import "./App.css";
import Canvas from "./canvas/Canvas";
import CellularAutomata from './cellularAutomata/CellularAutomata';
import { forEach } from "./utils/utils";
import Colors from './cellularAutomata/Colors';
import { setInterval } from "timers";
// import useEffect from 'react';
let print = console.log;
const App = (): JSX.Element =>
{
  const width: number = 800,
    height: number = 400;


  const cellularAutomata = new CellularAutomata(3, 10, 40);
  // const data = cellularAutomata.getArray2d();

  function inc()
  {
    cellularAutomata.spawn();

  }

  // useEffect(() =>
  // {
  //   cellularAutomata.spawn();
  // })
  useEffect(() =>
  {
    const interval: NodeJS.Timeout = setInterval(() => cellularAutomata.nextGen(), 300);

    return () => clearInterval(interval);
  }, [])
  useEffect(() =>
  {
    const interval: NodeJS.Timeout = setInterval(() => cellularAutomata.spawn(), 2000);

    return () => clearInterval(interval);
  }, [])



  return (
    <div className="App">
      <Canvas width={width} height={height} data={cellularAutomata.getArray2d()} />
      <button onClick={inc}>spawn</button>
      <button onClick={() => cellularAutomata.nextGen()}>next gen</button>
      <button onClick={() => cellularAutomata.formatPrint()}>print</button>
    </div>
  );
};

export default App;
