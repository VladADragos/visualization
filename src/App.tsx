import React from "react";
import "./App.css";
import Canvas from "./canvas/Canvas";
import { CShape, CRect, CCircle } from "./shapes/Shapes";

const App = (): JSX.Element => {
  const t = new CRect(100, 100, 100, 100);

  const t2 = new CRect(500, 100, 100, 100);

  const t3 = new CRect(300, 0, 100, 100);
  const c = new CCircle(0, 0, 50);

  const test: CShape[] = [t, t2, t3, c];
  function inc() {
    for (const shape of test) {
      shape.origin.x += 10;
    }
  }
  console.log("app rendered");
  return (
    <div className="App">
      <Canvas width={800} height={400} data={test} />
      <button onClick={inc}>plus 1</button>
    </div>
  );
};

export default App;
