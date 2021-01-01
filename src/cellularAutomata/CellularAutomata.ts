import { forEach, randomInt, get2dIndexAs1d, Array2D } from "../utils/utils";
import { CRect, CShape } from "../shapes/Shapes";
import Colors from "./Colors";
import CellStates from "./CellStates";
import Rules from "./Rules";
import eRules from "./eRules";
class CellularAutomata implements IObservable {
  grid: Array2D<number>;
  lineBuffer: number[];
  newLineBuffer : number[];
  height: number;
  width: number;
  currentLine: number = 1;
  observers: IObserver[] = [];
  rule: eRules;

  constructor(width: number, height: number, cellSize: number,rule:eRules = 30) {

    this.width = width;
    this.height = height;
    this.lineBuffer = new Array(width).fill(0);
    this.newLineBuffer = new Array(width).fill(0);
    this.rule = rule
    this.grid = new Array2D(this.height, this.width, () => 0);
  }

  notifyReset() {
    for (const observer of this.observers) {
      observer.onReset();
    }
  }
  notifySet(y:number,x:number,value:number) {
    for (const observer of this.observers) {
      observer.onSet(y,x,value);
    }
  }
  subscribe(observer: IObserver): void {
    this.observers.push(observer);
  }

  reset() {
    this.grid = new Array2D(this.height, this.width, () => 0);
    this.notifyReset();
  }
  notifyMove(from: index, to: index): void {
    if (this.observers.length !== 0) {
      for (const observer of this.observers) {
        observer.onMove(from, to);
      }
    }
  }
  notifySpawn(spawnLocation: number): void {
    if (this.observers.length !== 0) {
      for (const observer of this.observers) {
        observer.onSpawn(spawnLocation);
      }
    }
  }

  spawn() {
    const ranIndex = randomInt(0, this.width-1);
    this.grid.set(0, ranIndex, 1);
    this.notifySpawn(ranIndex);
  }

  isInAir(y: number, x: number): boolean {
    return y + 1 < this.height && this.grid.get(y + 1, x) === CellStates.dead; //this.field[y + 1][x]
  }

  nextGen(): void {
    const indicesArray: { from: index; to: index }[] = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.grid.get(y, x) !== CellStates.dead) {
          if (this.isInAir(y, x)) {
            indicesArray.push({ from: { x: x, y: y }, to: this.down(x, y) });
          } else if (this.getLeftRight(y, x).length > 0) {
            const ns = this.getLeftRight(y, x);
            if (ns.length === 2) {
              const ranNum: number = randomInt(0, 1);
              indicesArray.push({ from: { x: x, y: y }, to: ns[ranNum] });
            } else {
              indicesArray.push({ from: { x: x, y: y }, to: ns[0] });
            }
            // ns[0].
          }
        }
      }
    }
    forEach(indicesArray, ({ from, to }) => this.switchPlaces(from, to));
  }

  initialize(){
    let on = false; 
    let mid = Math.floor(this.width/2);
    this.lineBuffer[mid] =CellStates.alive; 
    this.notifySet(0,mid,1);
    // for(let x = 0; x < this.width; x++) {

    //   if(on){
      //     this.lineBuffer[x] =CellStates.alive; 
      //     // this.grid.set(0,x,CellStates.alive);
      //     this.notifySet(0,x,1);
      //   }
      //   on = !on;
      // }
  }
  nextGenLine(): void {
    
    // let prevLine = (this.currentLine -1) % (this.height-1);
    for(let x = 0; x < this.width; x++){
      let current = this.lineBuffer[x]
      let left =this.lineBuffer[(x+this.width-1)%this.width];
      let right = this.lineBuffer[(x+1)%this.width];
      let value =Rules.rule1(left,current,right,this.rule); 
      this.newLineBuffer[x] = value;
      this.notifySet(this.currentLine,x,value);
    }
    this.lineBuffer = [...this.newLineBuffer];

    this.currentLine = (this.currentLine +1) % (this.height);;

    // this.currentLine = 
  }

  down(x: number, y: number): index {
    return { x, y: y + 1 };
  }
  switchPlaces(from: index, to: index): void {
    this.grid.set(from.y, from.x, CellStates.dead);
    this.grid.set(to.y, to.x, CellStates.alive);
    this.notifyMove(from, to);
  }

  printFieldVal(y: number, x: number) {
    console.log(this.grid.get(y, x));
  }
  getLeftRight(y: number, x: number): index[] {
    const retArr: index[] = [];
    if (y + 1 < this.height) {
      if (x - 1 > -1 && this.isEmpty({ x: x - 1, y: y + 1 })) {
        retArr.push({ x: x - 1, y: y + 1 });
      }

      if (x + 1 < this.width && this.isEmpty({ x: x + 1, y: y + 1 })) {
        retArr.push({ x: x + 1, y: y + 1 });
      }
    }
    return retArr;
  }

  isEmpty(index: index) {
    return this.grid.get(index.y, index.x) === CellStates.dead;
  }

  formatPrint() {
    let str: string = "";
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const cell = this.grid.get(y, x);
        if (cell === CellStates.alive) {
          str += "o";
        } else {
          str += "#";
        }
      }
      str += "\n";
    }

    console.log(str);
  }
  formatPrintLine() {
    let str: string = "";
      for (let x = 0; x < this.width; x++) {
        const cell = this.lineBuffer[x];
        if (cell === CellStates.alive) {
          str += "o";
        } else {
          str += "#";
        }
      }
      str += "\n";
    

    console.log(str);
  }
}

export default CellularAutomata;
