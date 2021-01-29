import React from "react";
import "./App.css"
import Canvas from "./canvas/Canvas";


// asyncfunction test()
// {
//   const a = await fetch("./App.css");
//   console.log(a);

// }
const App = (): JSX.Element =>
{

  // test();







  return (
    <div className="App">
      <Canvas width={1000} height={600} />
    </div>
  );
};

export default App;