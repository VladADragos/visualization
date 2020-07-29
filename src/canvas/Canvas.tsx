import React, { useRef, useEffect } from "react";
import Renderer from "./Renderer";
interface canvasProps
{
  width: number;
  height: number;
  data: IDrawable[];
  debug?: boolean;
  animation?: (step: number) => void;
}

const Canvas = ({
  width,
  height,
  data,
  debug = false,
  animation: move,
}: canvasProps): JSX.Element =>
{
  if (debug) console.log("canvas mounted");
  const canvasRef: React.MutableRefObject<Nullable<HTMLCanvasElement>> = useRef(
    null
  );
  const rendererRef: React.MutableRefObject<Nullable<Renderer>> = useRef(null);
  let prevStep: number = 0;
  function draw(step: number)
  {
    if (debug) console.log("fps " + (step - prevStep));
    const renderer = rendererRef.current;

    renderer?.clear(width, height);
    renderer?.drawText("hello world");
    if (move !== undefined) {
      move(step - prevStep);
    }
    renderer?.drawAll(data);

    prevStep = step;
    requestAnimationFrame(draw);
  }

  useEffect(() =>
  {
    if (debug) console.log("first render");
    const ctx = canvasRef.current?.getContext("2d");

    if (ctx !== null) {
      rendererRef.current = new Renderer(ctx as CanvasRenderingContext2D);
    } else {
      console.log("context error");
    }
  }, [debug]);

  useEffect(() =>
  {
    draw(0);
    if (debug) console.log("canvas drawn");
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
