import React from "react";
import "./App.css";
import Canvas from "./canvas/Canvas";
import { CShape, CRect, CCircle } from "./shapes/Shapes";
import { forEach, create2DArray } from "./utils/utils";

const App = (): JSX.Element =>
{
  const width: number = 800,
    height: number = 400;

  const t = new CRect(100, 100, 100, 100);
  const t2 = new CRect(500, 100, 100, 100);
  const t3 = new CRect(300, 0, 100, 100);
  const c = new CCircle(0, 0, 50);

  const shapes: CShape[] = [t, t2, t3, c];
  function inc()
  {
    forEach(shapes, (shape) =>
    {
      shape.origin.x += 10;
    });
  }

  function move(step: number)
  {
    forEach(shapes, (shape) =>
    {
      shape.origin.y += step / 4;
      if (shape.origin.y > 400) {
        shape.origin.y = 0;
      }
    });
  }

  console.log("app rendered");
  return (
    <div className="App">
      <Canvas width={width} height={height} data={shapes} animation={move} />
      <button onClick={inc}>plus 1</button>
    </div>
  );
};

export default App;
