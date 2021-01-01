import React, { useRef, useEffect } from "react";
import Renderer from "./Renderer";
import { CShape } from "../shapes/Shapes";
import Svg from "./Square-symbol.svg";

import { createImg } from "../utils/utils";
interface canvasProps {
  width: number;
  height: number;
  data: IDrawable[];
  debug?: boolean;
  animation?: (step: number, time: number) => void;
}

const Canvas = ({
  width,
  height,
  data,
  debug = false,
  animation,
}: canvasProps): JSX.Element => {
  const Img = createImg(Svg);
  if (debug) console.log("canvas mounted");
  const canvasRef: React.MutableRefObject<Nullable<HTMLCanvasElement>> = useRef(
    null
  );
  const rendererRef: React.MutableRefObject<Nullable<Renderer>> = useRef(null);
  let prevStep: number = 0;
  let i = 0;
  function draw(step: number): number {
    if (debug) console.log("fps " + (step - prevStep));
    const renderer = rendererRef.current;
    if (renderer) {
      if (animation !== undefined) {
        animation(step - prevStep, step);
      }

      renderer.drawAll(data);
      prevStep = step;
      return requestAnimationFrame(draw);
    }
    return 0;
  }

  useEffect(() => {
    if (debug) console.log("first render");
    const ctx = canvasRef.current?.getContext("2d");

    if (ctx) {
      rendererRef.current = new Renderer(ctx);
    } else {
      console.error("Context was not set");
    }
  }, [debug]);

  useEffect(() => {
    const handle =  draw(0);
    if (debug) console.log("canvas drawn");
    return ()=> cancelAnimationFrame(handle);
  });

  useEffect(() => {
    if (rendererRef.current) {
      const x = rendererRef.current;
    }
  });
  console.log("canvas render");
  return (
    <>
      <canvas
        width={width}
        height={height}
        ref={canvasRef}
        style={{ border: "3px gray solid" }}
      />
    </>
  );
};

export default Canvas;

