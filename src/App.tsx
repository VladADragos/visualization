import React from "react";
import "./App.css"
import Canvas from "./canvas/Canvas";
import {Matrix4x4,Vec4} from "./utils/Math";


// asyncfunction test()
// {
//   const a = await fetch("./App.css");
//   console.log(a);

// }
const App = (): JSX.Element =>
{

  // test();

  const col0 = new Vec4(2,2,2,2);
  const col1 = new Vec4(2,2,2,2);
  const col2 = new Vec4(2,2,2,2);
  const col3 = new Vec4(2,2,2,2);
  const m =  new Matrix4x4().fill(col0,col1,col2,col3);
  m.multiply(m.copy());
  m.scale(0.5);
  m.array.print();



  return (
    <div className="App">
      {/* <Canvas width={1000} height={600} /> */}
    </div>
  );
};

export default App;