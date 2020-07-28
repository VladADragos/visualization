import React from "react";
import "./App.css";
import Canvas from "./canvas/Canvas";
import { CShape, CRect, CCircle } from "./shapes/Shapes";

const App = (): JSX.Element => {
  const s: VertexArray = [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
    { x: 50, y: 100 },
  ];
  const circle: ICircle = { origin: { x: 0, y: 0 }, radius: 100 };

  const t = new CRect(100, 100, 100, 100);

  const t2 = new CRect(500, 100, 100, 100);

  const t3 = new CRect(300, 0, 100, 100);
  const c = new CCircle(0, 0, 50);

  const test: CShape[] = [t, t2, t3, c];
  return (
    <div className="App">
      <Canvas width={800} height={400} data={test} />
    </div>
  );
};

export default App;
