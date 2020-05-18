import React from 'react';
import './App.css';
import Canvas from './Canvas';



function App() {

  let a: number = 0;
  function draw(ctx: Undefinable<Nullable<CanvasRenderingContext2D>>): void {
    // drawRect(ctx, 0, 0, 50, 50);
    drawTetrisPeice(ctx);

  }

  let offset = 0;
  function drawTetrisPeice(ctx: Undefinable<Nullable<CanvasRenderingContext2D>>) {
    const size = 40;
    drawRect(ctx, 100, 100 + offset, size, size * 3);
    drawRect(ctx, 100 + size, 100 + size + offset, size, size);
    offset += 1;
  }




  function drawRect(ctx: Undefinable<Nullable<CanvasRenderingContext2D>>, x: number, y: number, h: number, w: number) {

    ctx?.fillRect(x, y, w, h);
  }




  return (
    <div className="App">
      <Canvas width={800} height={400} animate={draw} stop={(a < 100)} />
    </div>
  );
}

export default App;
