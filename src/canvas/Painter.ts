import { CShape, CRect, CCircle, CTriangle } from "../shapes/Shapes";

export default class Painter {
  ctx: Undefinable<Nullable<CanvasRenderingContext2D>>;

  constructor(ctx: Undefinable<Nullable<CanvasRenderingContext2D>>) {
    this.ctx = ctx;
  }

  drawAll(shapes: CShape[]) {
    for (const shape of shapes)
      switch (shape.type()) {
        case "rect":
          this.drawRect(shape as CRect);
        case "triangle":
          this.drawTriangle(shape as CTriangle);
        case "circle":
          this.drawCircle(shape as CCircle);
        default:
          console.log("defualt");
      }
  }
  offset: number = 0;
  drawRect(rect: IRect) {
    const { origin, width, height } = rect;
    this.ctx?.fillRect(origin.x, origin.y, width, height);
  }

  clear(width: number, height: number): void {
    this.ctx?.clearRect(0, 0, width, height);
  }

  drawCircle(circle: ICircle, fill: boolean = true) {
    const { origin, radius } = circle;
    this.ctx?.beginPath();

    this.ctx?.arc(
      origin.x + radius,
      origin.y + radius,
      radius,
      0,
      Math.PI * 2,
      true
    );
    if (fill) {
      this.ctx?.fill();
    }
    this.ctx?.stroke();

    // this.ctx?.fillRect(x, y, w, h);
  }
  drawTriangle(triangle: ITriangle, fill: boolean = true) {
    const { origin, width, height }: ITriangle = triangle;
    this.ctx?.beginPath();
    this.ctx?.moveTo(origin.x, origin.y);

    this.ctx?.lineTo(origin.x + width, origin.y);
    this.ctx?.lineTo(origin.x + width * 0.5, origin.y + height);
    this.ctx?.closePath();
    this.ctx?.fill();
  }

  drawPoly(array: VertexArray) {
    this.ctx?.beginPath();
    this.ctx?.moveTo(array[0].x, array[0].y);
    for (let i: number = 1; i < array.length; i++) {
      let vertex: IVec2 = array[i];

      this.ctx?.lineTo(vertex.x, vertex.y);
    }
    this.ctx?.closePath();
    this.ctx?.fill();
  }

  drawTetrisPiece(offsetX: number = 0, offsetY: number = 0) {
    const size: number = 40;
    console.log("tetris");

    const rect: IRect = {
      origin: { x: offsetX, y: offsetY + this.offset },
      width: size,
      height: size * 3,
    };
    this.drawRect(rect);

    const rect2: IRect = {
      origin: { x: size + offsetX, y: size + this.offset + offsetY },
      width: size,
      height: size,
    };

    this.drawRect(rect2);
    if (2 * size + this.offset < 400) {
      this.offset += 1;
    } else {
      this.offset = 0;
    }
  }
}
