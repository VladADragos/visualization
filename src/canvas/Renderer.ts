export default class Renderer {
  renderContext: CanvasRenderingContext2D;
  font: string = "16px serif";
  defaultColor = "#000";
  constructor(renderContext: CanvasRenderingContext2D) {
    this.renderContext = renderContext;
  }

  drawAll(shapes: IDrawable[]) {
    for(let i = 0; i<shapes.length; i++){
      shapes[i].draw(this);

    }
    // for (const shape of shapes) {
    //   shape.draw(this);
    // }
  }

  drawText(text: string) {
    this.renderContext.fillText(text, 500, 200);
  }
  offset: number = 0;
  drawRect(rect: IRect, color = "#000") {
    this.renderContext.fillStyle = color;
    // this.renderContext.fillStyle = color;
    // this.renderContext.strokeStyle = color;
    // const { origin, width, height } = rect;
    this.renderContext.fillRect(rect.origin.x, rect.origin.y, rect.width, rect.height);
    // this.renderContext.strokeStyle = this.defaultColor;
    // this.renderContext.fillStyle = this.defaultColor;
    // this.renderWithColor(color, () => {
    //   // console.log("Cords x:" + origin.x/16)
    //   // this.renderContext.strokeRect(origin.x, origin.y, width, height);
    // });

    // this.renderContext.fillStyle = this.defaultColor;
  }

  clear(width: number, height: number): void {
    this.renderContext.clearRect(0, 0, width, height);
  }

  drawCircle(circle: ICircle, fill: boolean = true, color = "#000") {
    this.renderWithColor(color, () => {
      const { origin, radius } = circle;

      this.renderContext.beginPath();
      this.renderContext.arc(
        origin.x + radius,
        origin.y + radius,
        radius,
        0,
        Math.PI * 2,
        true
      );
      if (fill) {
        this.renderContext.fill();
      }
      this.renderContext.stroke();
    });
  }
  drawTriangle(triangle: ITriangle, fill: boolean = true, color = "#000") {
    this.renderWithColor(color, () => {
      const { origin, width, height }: ITriangle = triangle;
      this.renderContext.beginPath();
      this.renderContext.moveTo(origin.x, origin.y);

      this.renderContext.lineTo(origin.x + width, origin.y);
      this.renderContext.lineTo(origin.x + width * 0.5, origin.y + height);
      this.renderContext.closePath();
      this.renderContext.fill();
    });
  }

  drawPoly(array: VertexArray, color = "#000") {
    this.renderWithColor(color, () => {
      this.renderContext.beginPath();
      this.renderContext.moveTo(array[0].x, array[0].y);
      for (let i: number = 1; i < array.length; i++) {
        let vertex: IVec2 = array[i];

        this.renderContext.lineTo(vertex.x, vertex.y);
      }
      this.renderContext.closePath();
      this.renderContext.fill();
    });
  }

  drawSvg(svg: CanvasImageSource, dy: number, dx: number) {
    this.renderContext.drawImage(svg, dx, dy);
  }

  renderWithColor(color: string, fn: () => void) {
    this.renderContext.fillStyle = color;
    this.renderContext.strokeStyle = color;
    fn();

    this.renderContext.strokeStyle = this.defaultColor;
    this.renderContext.fillStyle = this.defaultColor;
  }
}