import React, { useRef, useEffect } from "react";

// import { CRect } from "../shapes/Shapes";
import { IndexBuffer, Program, Shader, ShaderType, VertexBuffer } from "../libwebgl/core/Core";
import { Matrix4x4 } from "../utils/Math";
import Renderer from "../libwebgl/Renderer";
interface canvasProps
{
  width: number;
  height: number;
  // data?: CRect[];
  // selected?: Set<CRect>;
  debug?: boolean;
  getCanvas?: (canvas: HTMLCanvasElement) => void
  onClick?: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>, r: Renderer) => void;
  animation?: (step: number, time: number) => void;
}

const Canvas = ({
  width,
  height,
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
  let renderer: Nullable<Renderer>;

  let off = 0;
  let diff = 10;
  function draw(step: number): number
  {

    run(off, 100);
    run(off, 0);
    run(off, -100);
    off += diff;
    if ((off + 20) >= width || off <= 0) {
      diff *= -1;
    }

    return requestAnimationFrame(draw);
  }
  function rect(x0: number, y0: number, dx: number, dy: number): number[]
  {
    let arr = [
      x0, y0,
      x0 + dx, y0,
      x0 + dx, y0 + dy,
      x0, y0 + dy

    ];
    // [0, 1, 2, 2, 3, 0];


    return arr;
  }
  let color = 0;
  function run(offset: number, y: number)
  {
    if (renderer) {
      if (color == 1) {
        color = 0;
      }
      renderer.drawRect(0 + offset, 100 + y, 20, 20, color);
      color += 0.01;

      // renderer.beginRender();
      // renderer.addRect(0 + offset, 100 + y, 20, 20);
      // renderer.endRender();
      // console.log(renderer.fragShader);
      // renderer.addRect(0 + offset, 100, 200, 200);
      // renderer.program.use();
      // renderer.fragShader.setUniform4f("inColor", renderer.drawColor);
      // renderer.fragShader.setUniformMat4f("m_proj", renderer.projection.asArray());
      // renderer.webgl.drawElements(renderer.webgl.TRIANGLES, renderer.ibo.getCount(), renderer.webgl.UNSIGNED_INT, 0);
      // renderer.f();
    }


    // const program = new Program();
    // //shaders
    // const proj: Float32Array = (new Matrix4x4()).ortho(0, width, 0, height, -1, 1).asArray();
    // const vert = new Shader(program, ShaderType.VERTEX);
    // const frag = new Shader(program, ShaderType.FRAGMENT);

    // await vert.bind("./shaders/vertex.glsl");
    // await frag.bind("./shaders/frag.glsl");
    // program.link();


    // const data = rect(0 + offset, 100, 350, 250);

    // const indexArray = [0, 1, 2, 2, 3, 0];

    // const vbo = new VertexBuffer(data, 1);

    // const ibo = new IndexBuffer(indexArray, 6);
    // program.use();
    // frag.setUniform4f("inColor", [1, 0, 0, 1]);
    // // console.log(proj.length);
    // frag.setUniformMat4f("m_proj", proj);
    // const instance = WebGLContextProvider.getInstance();
    // instance.drawElements(instance.TRIANGLES, ibo.getCount(), instance.UNSIGNED_INT, 0);



  }


  useEffect(() =>
  {
    if (debug) console.log("first render");
    // const ctx = canvasRef.current?.getContext("2d");
    const webgl = canvasRef.current?.getContext("webgl2");
    if (webgl) {
      // assert(true);
      webgl.viewport(0, 0, webgl.drawingBufferWidth, webgl.drawingBufferHeight);
      webgl.clearColor(0.0, 0.8, 0.5, 1.0);
      webgl.clear(webgl.COLOR_BUFFER_BIT);
      renderer = new Renderer(webgl, width, height);
      // renderer.program = new Program(webgl);
      // renderer.addShaders();





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
    const handle = draw(0);
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
        style={{ border: "3px gray solid", backgroundColor: "lightgray" }}
      />
    </>
  );
};

export default Canvas;

