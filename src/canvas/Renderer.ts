import { Program, Shader, ShaderType } from "./Core";
import WebGLContextProvider from "./WebGLContextProvider";

export default class Renderer
{
  webgl: WebGL2RenderingContext;
  program!: Program;
  // width: number;
  // height: number;
  constructor(width:number,height:number)
  {
    this.webgl = WebGLContextProvider.getInstance();
  }


  beginRender()
  {
    this.program = new Program();
    this.addShaders();
    this.program.link();


  }

  async addShaders()
  {
      const vert = new Shader(this.program, ShaderType.VERTEX);
      await vert.bind("./shaders/vertex.glsl");
      const frag = new Shader(this.program, ShaderType.FRAGMENT);
      await frag.bind("./shaders/frag.glsl");
  }

  endRender()
  {
    this.program.use();
    

  }

  clearCanvas()
  {

  }

  drawRect(x0:number,y0:number,dx:number,dy:number)
  {

  }

  normalize(a: number):number{
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