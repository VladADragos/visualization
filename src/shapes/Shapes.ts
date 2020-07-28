abstract class CShape {
  origin: IVec2 = { x: 0, y: 0 };
  constructor(x: number, y: number) {
    this.origin.x = x;
    this.origin.y = y;
  }
  abstract type(): string;
}

class CRect extends CShape implements IRect {
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
}

class CTriangle extends CShape implements ITriangle {
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
}

class CCircle extends CShape implements ICircle {
  radius: number;
  constructor(x: number, y: number, radius: number) {
    super(x, y);
    this.radius = radius;
  }
  type(): string {
    return "circle";
  }
}

export { CShape, CCircle, CRect, CTriangle };
