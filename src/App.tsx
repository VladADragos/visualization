import React from "react";
import "./App.css"
import Canvas from "./canvas/Canvas";
import { Matrix4x4, Vec4 } from "./utils/Math";


// asyncfunction test()
// {
//   const a = await fetch("./App.css");
//   console.log(a);

// }
const App = (): JSX.Element  =>
{

  // test();

  // const col0 = new Vec4(1,2,3,4);
  // const col1 = new Vec4(5,6,7,8);
  // const col2 = new Vec4(9,10,11,12);
  // const col3 = new Vec4(13,14,15,16);
  // const m =  new Matrix4x4().fill(col0,col1,col2,col3);
  // m.multiply(m.copy());
  // m.scale(0.5);
  // m.array.print();

  console.log("123");

  return (
    <div className="App">
      <Canvas width={1000} height={600} />
    </div>
  );
};

export default App;