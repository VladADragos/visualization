import React from "react";
import "./App.css";
import CellularAutomataComponent from "./cellularAutomata/CellularAutomataComponent";
import eRules from "./cellularAutomata/eRules";
const App = (): JSX.Element => {
  let size = 2**5;
  return (
    <div className="App">
      <CellularAutomataComponent width={size} height={size} cellSize={4} rule={eRules.rule_30}/>
      {/* <CellularAutomataComponent width={size} height={size} cellSize={2} rule={eRules.rule_30}/>
      <CellularAutomataComponent width={size} height={size} cellSize={2} rule={eRules.rule_50}/>
      <CellularAutomataComponent width={size} height={size} cellSize={2} rule={eRules.rule_150}/>
      <CellularAutomataComponent width={size} height={size} cellSize={2} rule={eRules.rule_94}/>
      <CellularAutomataComponent width={size} height={size} cellSize={2} rule={eRules.rule_188}/>
      <CellularAutomataComponent width={size} height={size} cellSize={2} rule={eRules.rule_126}/>
      <CellularAutomataComponent width={size} height={size} cellSize={2} rule={eRules.rule_190}/> */}
    </div>
  );
};

export default App;
