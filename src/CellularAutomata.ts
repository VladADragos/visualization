class CellularAutomata
{
  cellSize: number = 40;
  height = 4;
  width = 4;

  constructor(width: number, height: number)
  {
    this.height = height;
    this.width = width;
  }

  getArray2d(): IDrawable[]
  {
    throw new Error('Method not implemented.');
  }

  nextGen(): void { }
}

export default CellularAutomata;
