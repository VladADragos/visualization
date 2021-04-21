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
  drawColor: [number, number, number, number] = [1, 0, 0, 1];
  constructor(gl: WebGL2RenderingContext, width: number, height: number)
  {
    this.webgl = gl;
    this.projection = new Matrix4x4();
    this.projection.ortho(0, width, 0, height, -1, 1);
    this.width = width;
    this.height = height;
  }


  recalculateProjection(left: number, right: number, bottom: number, top: number, near: number, far: number)
  {
    this.projection.ortho(left, right, bottom, top, near, far);
  }
  beginRender()
  {
    // this.program = new Program();
    this.addShaders();
    this.program.link();


  }
  endRender()
  {
    this.program.use();
    this.fragShader.setUniform4f("inColor", this.drawColor);
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
  addShaders()
  {
    const vertexShader = new Shader(this.webgl, this.program, ShaderType.VERTEX);
    const fragShader = new Shader(this.webgl, this.program, ShaderType.FRAGMENT);
    vertexShader.bind();
    fragShader.bind();

    this.vertexShader = vertexShader;
    this.fragShader = fragShader;
  }

  clearCanvas()
  {

  }

  drawRect(x0: number, y0: number, dx: number, dy: number)
  {
    this.beginRender();
    this.addRect(x0, y0, dx, dy);
    this.endRender();
  }

  normalize(a: number): number
  {
    // let h = this.height/2;
    // let w = this.width/2;


    //200,200
    // 200/ this.height
    // 200/ this.width
    //-w..w
    //-h..h

    return a
  }
}