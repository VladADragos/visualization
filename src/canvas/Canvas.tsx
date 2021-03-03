import React, { useRef, useEffect } from "react";
import Renderer from "./Renderer";
import { CRect } from "../shapes/Shapes";
import WebGLContextProvider from './WebGLContextProvider';
import { IndexBuffer, Program, Shader, ShaderType, VertexBuffer } from "./Core";
interface canvasProps
{
  width: number;
  height: number;
  data?: CRect[];
  selected?: Set<CRect>;
  debug?: boolean;
  getCanvas?: (canvas: HTMLCanvasElement) => void
  onClick?: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>, r: Renderer) => void;
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
}: canvasProps): JSX.Element =>
{
  if (debug) console.log("canvas mounted");
  const canvasRef: React.MutableRefObject<Nullable<HTMLCanvasElement>> = useRef(
    null
  );
  // const rendererRef: React.MutableRefObject<Nullable<Renderer>> = useRef(null);
  // let prevStep: number = 0;
  // function draw(step: number): number
  // {
  //   if (debug) console.log("fps " + (step - prevStep));
  //   const renderer = rendererRef.current;
  //   if (renderer) {
  //     renderer.clear(width, height);
  //     if (animation !== undefined) {
  //       animation(step - prevStep, step);
  //     }

  //     if (data && data.length > 0) {
  //       renderer.drawAll2((data as any));
  //       renderer.drawAll(data);
  //     }
  //     if (selected && selected.size > 0) {
  //       // renderer.drawPoly([{x:50,y:50},{x:50,y:50+50},{x:50+50,y:50+50},{x:50+50,y:50}]);
  //       renderer.drawSelectionBox(selected);

  //     }
  //     prevStep = step;
  //     return requestAnimationFrame(draw);
  //   }
  //   return 0;
  // }

  async function run(c: WebGLContextProvider, offset: number)
  {

    WebGLContextProvider.setInstance(c.gl);
    WebGLContextProvider.getInstance().clear(WebGLContextProvider.getInstance().COLOR_BUFFER_BIT);
    const program = new Program();
    //shaders
    const vert = new Shader(program, ShaderType.VERTEX);
    await vert.bind("./shaders/vertex.glsl");
    const frag = new Shader(program, ShaderType.FRAGMENT);
    await frag.bind("./shaders/frag.glsl");

    program.link();

    const data = [
      -0.5 + offset, -0.5 + offset,
      0.5 + offset, -0.5 + offset,
      0.5 + offset, 0.5 + offset,
      -0.5 + offset, 0.5 + offset,
    ];
    const indexArray = [0, 1, 2, 2, 3, 0];

    const vbo = new VertexBuffer(data, 1);

    const ibo = new IndexBuffer(indexArray, 6);
    program.use();
    WebGLContextProvider.getInstance().drawElements(c.gl.TRIANGLES, ibo.getCount(), c.gl.UNSIGNED_INT, 0);



  }


  useEffect(() =>
  {
    if (debug) console.log("first render");
    // const ctx = canvasRef.current?.getContext("2d");
    const webgl = canvasRef.current?.getContext("webgl2");
    if (webgl) {
      // assert(true);
      const c = new WebGLContextProvider(webgl);
      webgl.viewport(0, 0, webgl.drawingBufferWidth, webgl.drawingBufferHeight);
      webgl.clearColor(0.0, 0.8, 0.5, 1.0);
      webgl.clear(webgl.COLOR_BUFFER_BIT)
      run(c, -0.5);
      run(c, 0.0);
      run(c, 0.5);

      // run(c, 0.3);


      // c.cleanup();
      // c.use();

    }

    // if (ctx) {
    //   getCanvas?.(canvasRef.current as HTMLCanvasElement);
    //   rendererRef.current = new Renderer(ctx);
    // } else {
    //   console.error("Context was not set");
    // }
  }, [debug]);

  useEffect(() =>
  {
    // const handle = draw(0);
    if (debug) console.log("canvas drawn");
    // return () => cancelAnimationFrame(handle);
  });


  if (debug) console.log("canvas render");
  return (
    <>
      <canvas
        // onClick={(e) => { if (onClick) onClick(e, rendererRef.current as Renderer) }}
        width={width}
        height={height}
        ref={canvasRef}
        style={{ border: "3px gray solid" }}
      />
    </>
  );
};

export default Canvas;

