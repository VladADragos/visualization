import WebGLContextProvider from "./WebGLContexProvider";

class VertexArray
{
    gl: WebGL2RenderingContext;

    constructor()
    {
        this.gl = WebGLContextProvider.getInstance();
    }
}



export default VertexArray;