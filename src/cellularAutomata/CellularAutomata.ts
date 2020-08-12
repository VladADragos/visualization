import { forEach, randomInt, get2dIndexAs1d, Array2D } from "../utils/utils";
import { CRect, CShape } from "../shapes/Shapes";
import Colors from "./Colors";
import CellStates from "./CellStates";
class CellularAutomata implements IObservable {
  grid: Array2D<number>;
  height: number;
  width: number;
  observers: IObserver[] = [];

  constructor(width: number, height: number, cellSize: number) {
    this.width = width;
    this.height = height;
    this.grid = new Array2D(this.height, this.width, () => 0);
  }

  notifyReset() {
    for (const observer of this.observers) {
      observer.onReset();
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
    const ranIndex = randomInt(0, this.width);
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

  down(x: number, y: number): index {
    return { x, y: y + 1 };
  }
  switchPlaces(from: index, to: index): void {
    this.grid.set(from.y, from.x, 0);
    this.grid.set(to.y, to.x, 1);
    // this.field[from.y][from.x] = 0;
    // this.field[to.y][to.x] = 1;

    this.notifyMove(from, to);
    // this.visualArray[this.to2Dindex(from.y, from.x)].color = Colors.empty;
    // this.visualArray[this.to2Dindex(to.y, to.x)].color = Colors.air;
  }

  printFieldVal(y: number, x: number) {
    console.log(this.grid.get(y, x));
  }
  getLeftRight(y: number, x: number): index[] {
    const retArr: index[] = [];
    if (y + 1 < this.height) {
      if (x - 1 > -1 && this.isEmpty({ x: x - 1, y: y + 1 })) {
        retArr.push({ x: y - 1, y: y + 1 });
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
    // forEach(this.field, (row) => {
    //   forEach(row, (cell) => {
    //     if (cell === CellStates.alive) {
    //       str += "o";
    //     } else {
    //       str += "#";
    //     }
    //   });
    //   str += "\n";
    // });
    console.log(str);
  }
}

export default CellularAutomata;
