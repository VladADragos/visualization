import CellularAutomata from './CellularAutomata';
import { CRect, CShape } from '../shapes/Shapes';
import CellStates from './CellStates';
import { forEach, get2dIndexAs1d } from '../utils/utils';
import Colors from './Colors';
class CellularAutomataVisualizer implements IObserver
{

    ca: CellularAutomata;
    // TODO: optimize to not use [] but new Array() so that it does not resize when creating it

    visualArray: CShape[] = [];
    cellSize: number;
    height: number;
    width: number;
    constructor(ca: CellularAutomata, width: number, height: number, cellSize: number)
    {
        this.ca = ca;
        this.cellSize = cellSize;
        this.height = height;
        this.width = width;

        this.generateArray();
        this.ca.subscribe(this);
    }

    onSpawn(spawnLocation: number): void
    {
        this.visualArray[get2dIndexAs1d(0, spawnLocation, this.width)].color = Colors.air;
    }
    onMove(from: index, to: index): void
    {
        this.visualArray[get2dIndexAs1d(from.y, from.x, this.width)].color = Colors.empty;
        this.visualArray[get2dIndexAs1d(to.y, to.x, this.width)].color = Colors.air;
    }



    getArray2d(): IDrawable[]
    {
        return this.visualArray;
    }

    generateArray(): void
    {
        for (let i = 0; i < this.height; i++) {
            forEach(this.ca.field[i], (element, j) =>
            {
                j = (j as number);
                let rect = new CRect(j * this.cellSize + 0, i * this.cellSize + 0, this.cellSize, this.cellSize);

                if (element === CellStates.alive) {
                    if (!this.ca.isInAir(i, j)) {
                        rect.color = Colors.air;
                    }
                } else {
                    rect.color = Colors.empty;

                }

                this.visualArray.push(rect);
            })
        }
    }
}

export default CellularAutomataVisualizer;