import Color from "../utils/Color";
import { Matrix4x4 } from "../utils/Math";
// import { IndexBuffer, Program, Shader, ShaderType, VertexBuffer } from "../core/Core";
// import WebGLContextProvider from "../core/WebGLContextProvider";

import { Program, VertexBuffer, IndexBuffer, Shader, ShaderType } from "./core/Core";
export default class Renderer
{
  webgl: WebGL2RenderingContext;
  program!: Program;
  projection: Matrix4x4;
  fragShader!: Shader;
  vertexShader!: Shader;
  width: number;
  height: number;
  vbo!: VertexBuffer;
  ibo!: IndexBuffer;
  drawColor: Float32Array = new Float32Array([1, 0, 0, 1]);
  constructor(gl: WebGL2RenderingContext, width: number, height: number)
  {
    this.webgl = gl;
    this.projection = new Matrix4x4();
    this.projection.ortho(0, width, 0, height, -1, 1);
    this.width = width;
    this.height = height;
    this.program = new Program(gl);
  }


  recalculateProjection(left: number, right: number, bottom: number, top: number, near: number, far: number)
  {
    this.projection.ortho(left, right, bottom, top, near, far);
  }
  private beginRender()
  {
    // this.program = new Program();
    this.addShaders();
    this.program.link();


  }
  private endRender()
  {
    this.program.use();
    this.fragShader.setUniform4fv("inColor", this.drawColor);
    this.fragShader.setUniformMat4f("m_proj", this.projection.asArray());
    this.webgl.drawElements(this.webgl.TRIANGLES, this.ibo.getCount(), this.webgl.UNSIGNED_INT, 0);
    // this.f();
    // this.fragShader.unbind();
    // this.vertexShader.unbind();
  }
  f()
  {
    this.webgl.drawElements(this.webgl.TRIANGLES, this.ibo.getCount(), this.webgl.UNSIGNED_INT, 0);

  }

  addGeometry(indexArray: number[], data: number[])
  {
    // const indexArray = [0, 1, 2, 2, 3, 0];
    this.vbo = new VertexBuffer(this.webgl, data, 1);
    this.ibo = new IndexBuffer(this.webgl, indexArray, 6);
  }
  addRect(x0: number, y0: number, dx: number, dy: number)
  {
    this.addGeometry([0, 1, 2, 2, 3, 0], this.rect(x0, y0, dx, dy));
  }

  rect(x0: number, y0: number, dx: number, dy: number): number[]
  {
    let arr = [
      x0, y0,
      x0 + dx, y0,
      x0 + dx, y0 + dy,
      x0, y0 + dy

    ];

    return arr;
  }
  private addShaders()
  {
    const vertexShader = new Shader(this.webgl, this.program, ShaderType.VERTEX);
    const fragShader = new Shader(this.webgl, this.program, ShaderType.FRAGMENT);
    vertexShader.bind();
    fragShader.bind();

    this.vertexShader = vertexShader;
    this.fragShader = fragShader;
  }

  private clearCanvas()
  {

  }

  public drawRect(x0: number, y0: number, dx: number, dy: number, color: number)
  {
    this.beginRender();
    this.addRect(x0, y0, dx, dy);
    //  let l =  this.webgl.getUniformLocation(this.program.program,"inColor");
    //  this.webgl.uni

    // this.fragShader.setUniform4f("inColor", [1, 1, 0, 0]);
    // console.log(Color.Red().normalized());
    // console.log("hello???");
    // return;
    // #db8f8f", "db", "8f", "8f" ]
    // console.log(colorr);

    this.drawColor = Color.fromHex("#db8f8f").normalized();;

    // this.fragShader.
    this.endRender();

  }

}