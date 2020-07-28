import React, { useRef, useEffect } from "react";
import Renderer from "./Renderer";
import { CShape, CRect } from "../shapes/Shapes";
interface canvasProps {
  width: number;
  height: number;
  data: IDrawable[];
}

const Canvas = ({ width, height, data }: canvasProps): JSX.Element => {
  const canvasRef: React.MutableRefObject<Nullable<HTMLCanvasElement>> = useRef(
    null
  );
  const painter: React.MutableRefObject<Renderer> = useRef(new Renderer(null));

  let i = 0;
  function draw(step: number) {
    const test: IRect = {
      origin: { x: 0 + i, y: 0 + i },
      width: 100,
      height: 100,
    };
    // painter.current = new Painter(canvasRef.current?.getContext("2d"));
    painter.current.clear(width, height);

    painter.current.drawAll(data);
    requestAnimationFrame(draw);
  }

  useEffect(() => {
    console.log("first render");
    const ctx = canvasRef.current?.getContext("2d");
    painter.current = new Renderer(ctx);
  }, []);

  useEffect(() => {
    draw(0);
    console.log("canvas drawn");
  });

  return (
    <canvas
      width={width}
      height={height}
      ref={canvasRef}
      style={{ border: "3px red solid" }}
    />
  );
};

export default Canvas;
