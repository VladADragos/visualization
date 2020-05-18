import React from 'react';
import './App.css';
import Canvas from './Canvas';



function App() {

  function draw(ctx: Undefinable<Nullable<CanvasRenderingContext2D>>): void {
    drawTetrisPiece(ctx);
    drawTetrisPiece(ctx, 200, 0);
    drawTetrisPiece(ctx, 400, 0);
    drawTetrisPiece(ctx, 600, 0);
    drawTetrisPiece(ctx, 800, 0);

  }

  let offset = 0;
  function drawTetrisPiece(ctx: Undefinable<Nullable<CanvasRenderingContext2D>>, offsetX: number = 0, offsetY: number = 0) {
    const size: number = 40;

    drawRect(ctx, offsetX, offsetY + offset, size, size * 3);
    drawRect(ctx, size + offsetX, size + offset + offsetY, size, size);
    if (2 * size + offset < 400) {
      offset += 1;
    } else {
      offset = 0;
    }
  }


  function drawRect(ctx: Undefinable<Nullable<CanvasRenderingContext2D>>, x: number, y: number, h: number, w: number) {

    ctx?.fillRect(x, y, w, h);
  }


  return (
    <div className="App">
      <Canvas width={800} height={400} animate={draw} />
    </div>
  );
}

export default App;
