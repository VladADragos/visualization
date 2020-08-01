import React, { useEffect, useState } from "react";
import CellularAutomata from './CellularAutomata';
import CellularAutomataVisualizer from "./CellularAutomataVisualizer";
import Canvas from "../canvas/Canvas";


interface CellularAutomataComponentProps
{
    width: number;
    height: number;
    cellSize: number;
}

const CellularAutomataComponent = ({ width, height, cellSize }: CellularAutomataComponentProps): JSX.Element =>
{
    const canvasWidth: number = width * cellSize;
    const canvasHeight: number = height * cellSize;

    const cellularAutomata = new CellularAutomata(width, height, cellSize);
    const cellularAutomataVisualizer = new CellularAutomataVisualizer(cellularAutomata, width, height, cellSize);
    let stop = false;
    function inc()
    {
        cellularAutomata.spawn2(0);

    }

    useEffect(() =>
    {
        const interval: NodeJS.Timeout = setInterval(() => { if (!stop) cellularAutomata.nextGen() }, 50);

        return () => clearInterval(interval);
    }, [])


    useEffect(() =>
    {
        const interval: NodeJS.Timeout = setInterval(() => { if (!stop) { cellularAutomata.spawn(); cellularAutomata.spawn(); } }, 300);

        return () => clearInterval(interval);
    }, [stop, cellularAutomata])



    return (
        <div className="cellular-automata" style={{ width: canvasWidth }}>
            <Canvas width={canvasWidth} height={canvasHeight} data={cellularAutomataVisualizer.getArray2d()} />
            <div className="buttons">

                <button onClick={() => stop = !stop}>stop</button>
                <button onClick={() => cellularAutomata.formatPrint()}>print in console</button>
            </div>
        </div>
    );
};

export default CellularAutomataComponent;
