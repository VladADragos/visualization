import CellularAutomata from "./CellularAutomata";
import { CRect, CShape } from "../shapes/Shapes";
import CellStates from "./CellStates";
import { forEach, get2dIndexAs1d, Array2D } from "../utils/utils";
import Colors from "./Colors";
class CellularAutomataVisualizer implements IObserver {
  cellularAutomata: CellularAutomata;
  // TODO: optimize to not use [] but new Array() so that it does not resize when creating it

  visualArray: Array2D<CShape>;
  cellSize: number;
  height: number;
  width: number;
  constructor(
    cellularAutomata: CellularAutomata,
    width: number,
    height: number,
    cellSize: number
  ) {
    this.cellularAutomata = cellularAutomata;
    this.cellSize = cellSize;
    this.height = height;
    this.width = width;
    this.visualArray = new Array2D<CShape>(
      this.height,
      this.width,
      () => new CRect(0, 0, 0, 0)
    );
    this.generateArray();
    this.cellularAutomata.subscribe(this);
  }
  onReset(): void {
    this.visualArray.forEach((element) => (element.color = Colors.empty));
  }

  onSpawn(spawnLocation: number): void {
    this.visualArray.get(0, spawnLocation).color = Colors.air;
    // this.visualArray[get2dIndexAs1d(0, spawnLocation, this.width)].color =
    // Colors.air;
  }
  onMove(from: index, to: index): void {
    // this.visualArray[get2dIndexAs1d(from.y, from.x, this.width)].color =
    //   Colors.empty;
    // this.visualArray[get2dIndexAs1d(to.y, to.x, this.width)].color = Colors.air;
    this.visualArray.get(from.y, from.x).color = Colors.empty;
    this.visualArray.get(to.y, to.x).color = Colors.air;
  }
  onSet(y:number,x:number,value: number){
    // let num = 8;
    // this.visualArray.get(y,num).color = Colors.black;
    if(value){
      this.visualArray.get(y,x).color = Colors.air;
    } else{
      this.visualArray.get(y,x).color = Colors.empty;
    }
  }

  getArray2d(): IDrawable[] {
    return this.visualArray.asArray();
  }

  generateArray(): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let rect = new CRect(
          x * this.cellSize,
          y * this.cellSize,
          this.cellSize,
          this.cellSize
        );
        rect.color = Colors.empty;
        this.visualArray.set(y,x, rect);
      }
    }
  }
}

export default CellularAutomataVisualizer;
