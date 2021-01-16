import React, { useRef, useEffect } from "react";
import Renderer from "./Renderer";
import { CShape } from "../shapes/Shapes";
import Svg from "./Square-symbol.svg";

import { createImg } from "../utils/utils";
import { render } from "@testing-library/react";
interface canvasProps {
  width: number;
  height: number;
  data?: IDrawable[];
  selected?: Set<IRect>;
  debug?: boolean;
  getCanvas?:(canvas: HTMLCanvasElement)=>void
  onClick?: (e:React.MouseEvent<HTMLCanvasElement, MouseEvent>,r:Renderer)=>void;
  animation?: (step: number, time: number) => void;
}

const Canvas = ({
  width,
  height,
  data,
  selected,
  debug = false,
  getCanvas,
  onClick,
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
      renderer.clear(width,height);
      if (animation !== undefined) {
        animation(step - prevStep, step);
      }
      if(selected && selected.size > 0){
        // renderer.drawPoly([{x:50,y:50},{x:50,y:50+50},{x:50+50,y:50+50},{x:50+50,y:50}]);
        renderer.drawSelectionBox(selected);
      }
      if(data && data.length > 0){
        renderer.drawAll(data);
      }
      prevStep = step;
      return requestAnimationFrame(draw);
    }
    return 0;
  }

  useEffect(() => {
    if (debug) console.log("first render");
    const ctx = canvasRef.current?.getContext("2d");
    
    if (ctx) {
      getCanvas?.(canvasRef.current as HTMLCanvasElement);
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
        onClick={(e)=>{if(onClick) onClick(e,rendererRef.current as Renderer)}}
        width={width}
        height={height}
        ref={canvasRef}
        style={{ border: "3px gray solid" }}
      />
    </>
  );
};

export default Canvas;

