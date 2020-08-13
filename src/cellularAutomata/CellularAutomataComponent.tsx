import React, { useEffect, useState, useRef } from "react";
import CellularAutomata from "./CellularAutomata";
import CellularAutomataVisualizer from "./CellularAutomataVisualizer";
import Canvas from "../canvas/Canvas";

const CellularAutomataComponent = ({
  width,
  height,
  cellSize,
}: CellularAutomataComponentProps): JSX.Element => {
  const canvasWidth: number = width * cellSize;
  const canvasHeight: number = height * cellSize;

  const [freeze, setFreeze] = useState(false);

  const { current: cellularAutomata } = useRef(
    new CellularAutomata(width, height, cellSize)
  );

  const { current: cellularAutomataVisualizer } = useRef(
    new CellularAutomataVisualizer(cellularAutomata, width, height, cellSize)
  );

  // useEffect(() => {
  //   const interval: NodeJS.Timeout = setInterval(() => {
  //     if (!freeze) cellularAutomata.nextGen();
  //   }, 50);

  //   return () => clearInterval(interval);
  // }, [freeze, cellularAutomata]);

  // let i = 0;
  // useEffect(() => {
  //   const interval2: NodeJS.Timeout = setInterval(() => {
  //     if (!freeze) cellularAutomata.nextGen();
  //   }, 50);

  //   const interval: NodeJS.Timeout = setInterval(() => {
  //     if (!freeze) cellularAutomata.spawn();
  //     i += 100;
  //   }, 300 + i);

  //   return () => {
  //     clearInterval(interval);
  //     clearInterval(interval2);
  //   };
  // }, [freeze, cellularAutomata]);

  console.log("ca root");
  return (
    <div className="cellular-automata" style={{ width: canvasWidth }}>
      <Canvas
        width={canvasWidth}
        height={canvasHeight}
        data={cellularAutomataVisualizer.getArray2d()}
      />
      <Buttons
        freeze={freeze}
        setFreeze={setFreeze}
        cellularAutomata={cellularAutomata}
      />
    </div>
  );
};

interface ButtonsProps {
  freeze: boolean;
  setFreeze: React.Dispatch<React.SetStateAction<boolean>>;
  cellularAutomata: CellularAutomata;
}
const Buttons = ({ freeze, setFreeze, cellularAutomata }: ButtonsProps) => {
  return (
    <div className="buttons">
      <button onClick={() => setFreeze(!freeze)}>
        {freeze ? "play" : "pause"}
      </button>
      <button onClick={() => cellularAutomata.spawn()}>spawn</button>
      <button onClick={() => cellularAutomata.nextGen()}>next</button>
      <button onClick={() => cellularAutomata.reset()}>reset</button>
      <button onClick={() => cellularAutomata.grid.print()}>cells</button>
      <button onClick={() => cellularAutomata.formatPrint()}>array</button>
    </div>
  );
};

interface CellularAutomataComponentProps {
  width: number;
  height: number;
  cellSize: number;
}

export default CellularAutomataComponent;
