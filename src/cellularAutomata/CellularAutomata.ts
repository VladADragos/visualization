import { create2DArray, forEach } from '../utils/utils';
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
    const indicesArray = [];
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.field[i][j] !== CellStates.dead) {
          if (this.isInAir(j, i)) {
            indicesArray.push({ x: j, y: i })
          }
        }
      }
    }
    forEach(indicesArray, ({ x, y }) => this.moveDown(x, y));
  }


  moveDown(x: number, y: number)
  {
    // console.log(`i ${x} j ${y}`);

    this.field[y][x] = 0;
    this.field[y + 1][x] = 1;
    this.visualArray[this.to2Dindex(x, y)].color = Colors.empty;
    this.visualArray[this.to2Dindex(x, y + 1)].color = Colors.air;
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
