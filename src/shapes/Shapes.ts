import Renderer from "../canvas/Renderer";

abstract class CShape implements IDrawable {
  origin: IVec2 = { x: 0, y: 0 };
  constructor(x: number, y: number) {
    this.origin.x = x;
    this.origin.y = y;
  }
  draw(renderer: any): void {
    throw new Error("Method not implemented.");
  }
  abstract type(): string;
}

class CRect extends CShape implements IRect, IDrawable {
  width: number;
  height: number;
  constructor(x: number, y: number, width: number, height: number) {
    super(x, y);
    this.width = width;
    this.height = height;
  }
  type(): string {
    return "rect";
  }
  draw(renderer: Renderer): void {
    renderer.drawRect(this);
  }
}

class CTriangle extends CShape implements ITriangle, IDrawable {
  width: number;
  height: number;
  constructor(x: number, y: number, width: number, height: number) {
    super(x, y);
    this.width = width;
    this.height = height;
  }
  type(): string {
    return "triangle";
  }
  draw(renderer: Renderer): void {
    renderer.drawTriangle(this);
  }
}

class CCircle extends CShape implements ICircle, IDrawable {
  radius: number;
  constructor(x: number, y: number, radius: number) {
    super(x, y);
    this.radius = radius;
  }
  type(): string {
    return "circle";
  }
  draw(renderer: Renderer): void {
    renderer.drawCircle(this);
  }
}

export { CShape, CCircle, CRect, CTriangle };
