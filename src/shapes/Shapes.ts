import Renderer from "../canvas/Renderer";
import Colors from '../cellularAutomata/Colors';

abstract class CShape implements IDrawable
{
  origin: IVec2 = { x: 0, y: 0 };
  color: string;
  constructor(x: number, y: number, color: string)
  {
    this.origin.x = x;
    this.origin.y = y;
    this.color = color;
  }
  draw(renderer: any): void
  {
    throw new Error("Method not implemented.");
  }
  abstract type(): string;
}

class CRect extends CShape implements IRect, IDrawable
{
  width: number;
  height: number;
  constructor(x: number, y: number, width: number, height: number, color: string = Colors.ground)
  {
    super(x, y, color);
    this.width = width;
    this.height = height;
    this.color = color;
  }
  type(): string
  {
    return "rect";
  }
  draw(renderer: Renderer): void
  {
    renderer.drawRect(this, this.color);
  }
}

class CTriangle extends CShape implements ITriangle, IDrawable
{
  width: number;
  height: number;
  constructor(x: number, y: number, width: number, height: number, color: string = Colors.ground)
  {
    super(x, y, color);
    this.width = width;
    this.height = height;
  }
  type(): string
  {
    return "triangle";
  }
  draw(renderer: Renderer): void
  {
    renderer.drawTriangle(this);
  }
}

class CCircle extends CShape implements ICircle, IDrawable
{
  radius: number;
  constructor(x: number, y: number, radius: number, color: string = Colors.ground)
  {
    super(x, y, color);
    this.radius = radius;
  }
  type(): string
  {
    return "circle";
  }
  draw(renderer: Renderer): void
  {
    renderer.drawCircle(this);
  }
}

export { CShape, CCircle, CRect, CTriangle };
