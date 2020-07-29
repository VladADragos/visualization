import React from "react";
import "./App.css";
import Canvas from "./canvas/Canvas";
import CellularAutomata from './cellularAutomata/CellularAutomata';
import { forEach } from "./utils/utils";
import Colors from './cellularAutomata/Colors';
import { setInterval } from "timers";

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

  let hasSpawed = false;
  function move(step: number, time: number)
  {
    // console.log(step);
    // console.log(time);
    // console.log();
    // if ((time % 2) > 1.5) {
    // console.log("test");
    // }
    // setInterval(() =>
    // {
    //   console.log("test")
    // }, 1000);
    // if (step % 16) {
    // }
    // if (!hasSpawed) {
    //   cellularAutomata.spawn();
    // }
    // cellularAutomata.nextGen();
  }
  console.log(cellularAutomata.field);

  return (
    <div className="App">
      <Canvas width={width} height={height} data={cellularAutomata.getArray2d()} animation={move} />
      <button onClick={inc}>spawn</button>
      <button onClick={() => cellularAutomata.nextGen()}>next gen</button>
      <button onClick={() => cellularAutomata.formatPrint()}>print</button>
    </div>
  );
};

export default App;
