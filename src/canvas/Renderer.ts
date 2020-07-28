import { CShape, CRect, CCircle, CTriangle } from "../shapes/Shapes";

export default class Renderer {
  renderContext: Undefinable<Nullable<CanvasRenderingContext2D>>;

  constructor(renderContext: Undefinable<Nullable<CanvasRenderingContext2D>>) {
    this.renderContext = renderContext;
  }

  drawAll(shapes: IDrawable[]) {
    for (const shape of shapes) {
      shape.draw(this);
    }
  }
  offset: number = 0;
  drawRect(rect: IRect) {
    const { origin, width, height } = rect;
    this.renderContext?.fillRect(origin.x, origin.y, width, height);
  }

  clear(width: number, height: number): void {
    this.renderContext?.clearRect(0, 0, width, height);
  }

  drawCircle(circle: ICircle, fill: boolean = true) {
    const { origin, radius } = circle;
    this.renderContext?.beginPath();

    this.renderContext?.arc(
      origin.x + radius,
      origin.y + radius,
      radius,
      0,
      Math.PI * 2,
      true
    );
    if (fill) {
      this.renderContext?.fill();
    }
    this.renderContext?.stroke();

    // this.ctx?.fillRect(x, y, w, h);
  }
  drawTriangle(triangle: ITriangle, fill: boolean = true) {
    const { origin, width, height }: ITriangle = triangle;
    this.renderContext?.beginPath();
    this.renderContext?.moveTo(origin.x, origin.y);

    this.renderContext?.lineTo(origin.x + width, origin.y);
    this.renderContext?.lineTo(origin.x + width * 0.5, origin.y + height);
    this.renderContext?.closePath();
    this.renderContext?.fill();
  }

  drawPoly(array: VertexArray) {
    this.renderContext?.beginPath();
    this.renderContext?.moveTo(array[0].x, array[0].y);
    for (let i: number = 1; i < array.length; i++) {
      let vertex: IVec2 = array[i];

      this.renderContext?.lineTo(vertex.x, vertex.y);
    }
    this.renderContext?.closePath();
    this.renderContext?.fill();
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
