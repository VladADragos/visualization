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

  getColorOnPixel(x:number,y:number): Uint8ClampedArray{
    // console.log(x,y);
    return this.renderContext.getImageData(x,y,1,1).data;
  }

  drawText(text: string) {
    this.renderContext.fillText(text, 500, 200);
  }
  drawRect(rect: IRect, color = "#000") {
    // #5b92eb
    // console.log(color);
    this.renderContext.fillStyle = color;
    this.renderContext.fillRect(rect.origin.x, rect.origin.y, rect.width, rect.height);
  }
  drawRectPath(rect: IRect, color = "#000") {
    // this.renderContext.fillStyle = '#080808';
    this.renderContext.strokeStyle = '#002f7a';
    this.renderContext.beginPath();

    this.renderContext.moveTo(rect.origin.x,rect.origin.y);
    this.renderContext.lineTo(rect.origin.x,rect.origin.y+rect.height);
    this.renderContext.lineTo(rect.origin.x+rect.width,rect.origin.y+rect.height);
    this.renderContext.lineTo(rect.origin.x+rect.width,rect.origin.y);


    this.renderContext.closePath();
    // this.renderContext.fill();
    this.renderContext.stroke();


  }
  drawSelectionBox(selected: Set<IRect>){
    let collection: IRect[] = [];

    selected.forEach((v1,x,y)=> collection.push(v1));
    let x0 = collection[0].origin.x;
    let x1 = 0;
    let y0 = collection[0].origin.y;
    let y1 = 0;
    
    for(let i = 0; i<collection.length; i++){
      let {origin,width,height} = collection[i];
      x0 = Math.min(x0,origin.x);
      y0 = Math.min(y0,origin.y);
      x1 = Math.max(x1,origin.x+width);
      y1 = Math.max(y1,origin.y+height);
    }

    this.renderContext.beginPath();
    this.renderContext.moveTo(x0,y0);
    this.renderContext.lineTo(x0,y1);
    this.renderContext.lineTo(x1,y1);
    this.renderContext.lineTo(x1,y0);
    this.renderContext.closePath();
    this.renderContext.stroke();


  


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