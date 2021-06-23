import Color from "../utils/Color";
import { Matrix2x3, Matrix3x3, Matrix4x4, pentagonPoints, Vec2, Vec3 } from "../utils/Math";
// import { IndexBuffer, Program, Shader, webglConstants.Shaders, VertexBuffer } from "../core/Core";
// import WebGLContextProvider from "../core/WebGLContextProvider";

import { Program, VertexBuffer, IndexBuffer, Shader } from "./core/Core";
import VertexArray from "./core/VertexArray";
import VertexBufferLayot from "./core/VertexBufferLayout";
import * as webglConstants from "./core/webglConstants";

interface Geometry {
  points: number[];
  indices: number[];
}
export default class Renderer {
  webgl: WebGL2RenderingContext;
  program: Program;
  projection: Matrix4x4;
  fragShader!: Shader;
  vertexShader!: Shader;
  width: number;
  height: number;
  vbo!: VertexBuffer;
  ibo!: IndexBuffer;
  vao: VertexArray;
  vertexBufferLayout: VertexBufferLayot;
  drawColor: Float32Array = new Float32Array([1, 0, 0, 1]);
  constructor(gl: WebGL2RenderingContext, width: number, height: number) {
    this.webgl = gl;
    this.projection = new Matrix4x4();
    this.projection.ortho(0, width, 0, height, -1, 1);
    this.width = width;
    this.height = height;
    this.program = new Program(gl);
    this.vao = new VertexArray(this.webgl);
    this.vertexBufferLayout = new VertexBufferLayot();
  }


  recalculateProjection(left: number, right: number, bottom: number, top: number, near: number, far: number) {
    this.projection.ortho(left, right, bottom, top, near, far);
  }

  private beginRender() {
    // this.program = new Program();
    this.addShaders();
    this.program.link();


  }
  private endRender() {
    this.program.use();
    this.fragShader.setUniform4fv("inColor", this.drawColor);
    this.fragShader.setUniformMat4f("m_proj", this.projection.asArray());
    this.webgl.drawElements(this.webgl.TRIANGLES, this.ibo.getCount(), this.webgl.UNSIGNED_INT, 0);
    // this.f();
    // this.fragShader.unbind();
    // this.vertexShader.unbind();
  }
  f() {
    this.webgl.drawElements(this.webgl.TRIANGLES, this.ibo.getCount(), this.webgl.UNSIGNED_INT, 0);

  }

  addGeometry(indexArray: number[], data: number[]) {
    // const indexArray = [0, 1, 2, 2, 3, 0];
    this.vbo = new VertexBuffer(this.webgl, data);
    this.ibo = new IndexBuffer(this.webgl, indexArray, 6);
    const vbl = new VertexBufferLayot();
    vbl.push(2, webglConstants.DataTypes.FLOAT)
  }
  addRect(x0: number, y0: number, dx: number, dy: number) {
    this.addGeometry([0, 1, 2, 2, 3, 0], this.rect(x0, y0, dx, dy));
  }

  rect(x0: number, y0: number, dx: number, dy: number): number[] {
    let arr = [
      x0, y0,
      x0 + dx, y0,
      x0 + dx, y0 + dy,
      x0, y0 + dy

    ];

    return arr;
  }

  renderingFlow() {

    let program = new Program(this.webgl);
    let vertexShader = new Shader(this.webgl, program, webglConstants.Shaders.VERTEX_SHADER);
    vertexShader.bind();
    let fragmentShader = new Shader(this.webgl, program, webglConstants.Shaders.FRAGMENT_SHADER);
    fragmentShader.bind();

    program.link();


    // let vertexBuffer = new VertexBuffer(this.webgl, this.tri(500, 500, 100));
    // console.log(this.tri(250, 250, 1));
    let vertexBuffer = new VertexBuffer(this.webgl, this.rect(0, 0, 200, 200));
    let vertexArray = new VertexArray(this.webgl);
    let vertexBufferLayout = new VertexBufferLayot();

    vertexArray.bind();
    vertexBufferLayout.push(2, this.webgl.FLOAT);
    vertexArray.addBuffer(vertexBuffer, vertexBufferLayout);

    let indexBuffer = new IndexBuffer(this.webgl, [0, 1, 2, 2, 3, 0], 6);

    program.use();
    fragmentShader.setUniform4fv("inColor", Color.fromHex("#db8f8f").normalized());
    fragmentShader.setUniformMat4f("m_proj", this.projection.asArray());
    this.webgl.drawElements(this.webgl.TRIANGLES, indexBuffer.getCount(), this.webgl.UNSIGNED_INT, 0);




    // program = new Program(this.webgl);
    // vertexShader = new Shader(this.webgl, program, webglConstants.Shaders.VERTEX_SHADER);
    // vertexShader.bind();
    // fragmentShader = new Shader(this.webgl, program, webglConstants.Shaders.FRAGMENT_SHADER);
    // fragmentShader.bind();

    // program.link();


    //  vertexBuffer = new VertexBuffer(this.webgl, this.tri(500, 500, 100));
    // console.log(this.tri(250, 250, 1));
    const { points, indices } = this.pentagon(300, 100);
    // console.log(points);
    vertexBuffer = new VertexBuffer(this.webgl, points);
    vertexArray = new VertexArray(this.webgl);
    vertexBufferLayout = new VertexBufferLayot();

    // vertexArray.bind();
    vertexBufferLayout.push(2, this.webgl.FLOAT);
    vertexArray.addBuffer(vertexBuffer, vertexBufferLayout);

    indexBuffer = new IndexBuffer(this.webgl, indices, indices.length);

    program.use();
    fragmentShader.setUniform4fv("inColor", Color.fromHex("#db8f8f").normalized());
    fragmentShader.setUniformMat4f("m_proj", this.projection.asArray());
    this.webgl.drawElements(this.webgl.TRIANGLES, indexBuffer.getCount(), this.webgl.UNSIGNED_INT, 0);

  }
  private addShaders() {
    const vertexShader = new Shader(this.webgl, this.program, webglConstants.Shaders.VERTEX_SHADER);
    const fragShader = new Shader(this.webgl, this.program, webglConstants.Shaders.FRAGMENT_SHADER);
    vertexShader.bind();
    fragShader.bind();

    this.vertexShader = vertexShader;
    this.fragShader = fragShader;
  }

  private clearCanvas() {



  }

  private tri(dx: number, dy: number, size: number, angle: number) {
    let s = Math.sin(angle);
    let c = Math.cos(angle);

    let array = [
      dx + 0 * size,
      dy + 0 * size,
      dx + 1 * size,
      dy + 0 * size,
      dx + 0.5 * size,
      dy + 0.69 * size];

    // let array2 = [
    //   dx * c - dy * s,
    //   dx * s + dy * c,
    //   dx + (1 *) * size * c,
    //   dy * s,
    //   dx + 0.5 * size * c,
    //   dy + 0.69 * size * s];

    let mat = new Matrix2x3();
    const p1 = new Vec2(0, 0);
    const p2 = new Vec2(0, 1);
    const p3 = new Vec2(0.5, 0.69);
    mat.fill(p1, p2, p3);
    // mat.scale(100);
    let mat2 = new Matrix3x3();
    // console.log("before");
    // mat.print();
    mat.scale(size);
    mat.translate(dx, dy);
    // mat.rotate(3);

    // console.log("after");
    // mat.print();

    // const v1 = new Vec3(1, 0, 0);
    // const v2 = new Vec3(0, 1, 0);
    // const v3 = new Vec3(100, 100, 1);
    // let mat3 = new Matrix3x3().fill(v1, v2, v3);
    // let vec = new Vec3(1, 1, 1);
    // vec.multiply(mat3);

    // mat3.array.print();
    // console.log(vec.array);
    // console.log(mat2.getAsArray());
    // mat.multiply(mat2.copy());
    // console.log(mat.getAsArray());
    // [10, 10, 5, 9, 11, 5, 8, 12, 5]
    // mat.translate(0, 0);
    // console.log(mat.getAsArray());


    return mat.getAsArray();
  }


  private pentagon(offset: number, size: number): Geometry {
    const [p0, p1, p2, p3, p4] = pentagonPoints();

    // 4,0,3 trinagle 1 
    // 3,2,0 trinagle 2 
    // 0,1,2 trinagle 3 
    let points = [...p0.array, ...p1.array, ...p2.array, ...p3.array, ...p4.array];
    for (let i = 0; i < points.length; i++) {
      points[i] *= size;
      points[i] += offset;
    }
    // console.log(points);

    return {
      points,
      indices: [4, 0, 3,
        3, 2, 0,
        0, 1, 2]
    };
  }

  public drawRect(x0: number, y0: number, dx: number, dy: number, color: number) {
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

    this.drawColor = Color.fromHex("#db8f8f").normalized();

    // this.fragShader.
    this.endRender();

  }

}