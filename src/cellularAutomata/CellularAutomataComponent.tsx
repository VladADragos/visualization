import React, { useEffect, useState, useRef } from "react";
import CellularAutomata from "./CellularAutomata";
import CellularAutomataVisualizer from "./CellularAutomataVisualizer";
import Canvas from "../canvas/Canvas";
import eRules from "./eRules";

const CellularAutomataComponent = ({
  width,
  height,
  cellSize,
  rule,
}: CellularAutomataComponentProps): JSX.Element =>
{
  const canvasWidth: number = width * cellSize;
  const canvasHeight: number = height * cellSize;

  const [freeze, setFreeze] = useState(false);

  const { current: cellularAutomata } = useRef(
    new CellularAutomata(width, height, cellSize,rule)
  );
  
  const { current: cellularAutomataVisualizer } = useRef(
    new CellularAutomataVisualizer(cellularAutomata, width, height, cellSize)
    );
    console.log("init");
  cellularAutomata.initialize();

  // useEffect(() => {
  //   const interval: NodeJS.Timeout = setInterval(() => {
  //     cellularAutomata.nextGenLine();
  //   }, 300);

  //   return () => clearInterval(interval);
  // }, [freeze, cellularAutomata]);

  // let i = 0;
  // useEffect(() => {
  //   // cellularAutomata.initialize();
  //   console.log("herro0");
  //   const interval2: NodeJS.Timeout = setInterval(() => {
  //    cellularAutomata.nextGenLine();
  //   }, 20);

  //   // // const interval: NodeJS.Timeout = setInterval(() => {
  //   // //   if (!freeze) cellularAutomata.nextGenLine();
  //   // // }, 300);

  //   return () => 
  //     clearInterval(interval2);
  //     // clearInterval(interval2);
  //   }
  // }, [cellularAutomata]);

  console.log("ca root");
  return (
    <div className="cellular-automata" style={{ width: canvasWidth }}>
      <Canvas
        width={canvasWidth}
        height={canvasHeight}
        data={cellularAutomataVisualizer.getArray2d()}
        animation={()=>cellularAutomata.nextGenLine()}
        
      />
      <Buttons
        freeze={freeze}
        setFreeze={setFreeze}
        cellularAutomata={cellularAutomata}
      />
    </div>
  );
};

interface ButtonsProps
{
  freeze: boolean;
  setFreeze: React.Dispatch<React.SetStateAction<boolean>>;
  cellularAutomata: CellularAutomata;
}
const Buttons = ({ freeze, setFreeze, cellularAutomata }: ButtonsProps) =>
{
  return (
    <div className="buttons">
      <button onClick={() => setFreeze(!freeze)}>
        {freeze ? "play" : "pause"}
      </button>
      <button onClick={() => cellularAutomata.initialize()}>init</button>
      <button onClick={() => cellularAutomata.nextGenLine()}>nextLine</button>
      {/* <button onClick={() => cellularAutomata.spawn()}>spawn</button> */}
      {/* <button onClick={() => cellularAutomata.nextGen()}>next</button> */}
      {/* <button onClick={() => cellularAutomata.reset()}>reset</button> */}
      {/* <button onClick={() => cellularAutomata.grid.print()}>cells</button> */}
      <button onClick={() => cellularAutomata.formatPrintLine()}>print line</button>
    </div>
  );
};

interface CellularAutomataComponentProps
{
  width: number;
  height: number;
  cellSize: number;
  rule?: eRules
}

export default CellularAutomataComponent;
