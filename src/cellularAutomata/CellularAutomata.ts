import { create2DArray, forEach, randomInt } from '../utils/utils';
import { CRect, CShape } from '../shapes/Shapes';
import Colors from './Colors';
import CellStates from './CellStates';
import { CONNREFUSED } from 'dns';
class CellularAutomata
{
  cellSize: number;
  field: number[][];
  height: number;
  width: number;
  // TODO: optimize to not use [] but new Array() so that it does not resize when creating it
  visualArray: CShape[] = [];

  constructor(width: number, height: number, cellSize: number)
  {
    this.width = width;
    this.height = height;
    this.field = create2DArray(this.width, this.height, () => 0);
    this.cellSize = cellSize;
  }

  getArray2d(): IDrawable[]
  {
    if (this.visualArray.length < 1) {
      for (let i = 0; i < this.height; i++) {
        // console.log(this.field[i])
        forEach(this.field[i], (element, j) =>
        {
          j = (j as number);
          let rect = new CRect(j * this.cellSize + 0, i * this.cellSize + 0, this.cellSize, this.cellSize);

          if (element === CellStates.alive) {
            if (!this.isInAir(i, j)) {
              rect.color = Colors.air;
            }
          } else {
            rect.color = Colors.empty;

          }

          this.visualArray.push(rect);
        })
      }
    }
    return this.visualArray;
  }


  spawn()
  {
    this.field[0][1] = 1;
    this.visualArray[this.to2Dindex(0, 1)].color = Colors.air;
  }
  isInAir(x: number, y: number): boolean
  {
    return y + 1 < this.height && this.field[y + 1][x] === 0;
  }

  to2Dindex(width: number, height: number): number
  {
    return height + width * this.width;
  }
  nextGen(): void
  {
    const indicesArray: { from: index, to: index }[] = [];
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.field[i][j] !== CellStates.dead) {
          if (this.isInAir(j, i)) {
            indicesArray.push({ from: { x: j, y: i }, to: this.down(j, i) });
          } else if (this.getLeftRight(j, i).length > 0) {
            const ns = this.getLeftRight(j, i);
            console.log(ns);
            if (ns.length === 2) {
              const ranNum: number = randomInt(0, 1);
              indicesArray.push({ from: { x: j, y: i }, to: ns[ranNum] });
            } else {

              indicesArray.push({ from: { x: j, y: i }, to: ns[0] });
            }
            // ns[0].
          }
        }
      }
    }
    forEach(indicesArray, ({ from, to }) => this.switchPlaces(from, to));
  }

  down(x: number, y: number): index
  {
    return { x, y: y + 1 };
  }
  switchPlaces(from: index, to: index): void
  {
    this.field[from.y][from.x] = 0;
    this.field[to.y][to.x] = 1;
    this.visualArray[this.to2Dindex(from.y, from.x)].color = Colors.empty;
    this.visualArray[this.to2Dindex(to.y, to.x)].color = Colors.air;
  }

  printFieldVal(x: number, y: number)
  {
    console.log(this.field[y][x]);
  }
  getLeftRight(x: number, y: number): index[]
  {
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

  isEmpty(index: index)
  {
    return this.field[index.y][index.x] === CellStates.dead;
  }
  moveDown(x: number, y: number)
  {

    this.field[y][x] = 0;
    this.field[y + 1][x] = 1;
    this.visualArray[this.to2Dindex(y, x)].color = Colors.empty;
    this.visualArray[this.to2Dindex(y + 1, x)].color = Colors.air;
  }

  formatPrint()
  {
    let str: string = "";
    forEach(this.field, (row) =>
    {
      forEach(row, (cell) =>
      {
        if (cell === CellStates.alive) {
          str += "o";
        }
        else {
          str += "#"
        }
      });
      str += "\n";
    });
    console.log(str);

  }
}

export default CellularAutomata;
