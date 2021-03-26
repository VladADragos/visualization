import WebGLContextProvider from "./WebGLContexProvider";

class IndexBuffer
{
    gl: WebGL2RenderingContext;
    buffer: WebGLBuffer;
    count: number;


    constructor(data: IntArray, count: number)
    {
        this.gl = WebGLContextProvider.getInstance();
        this.buffer = this.gl.createBuffer() as WebGLBuffer;
        this.count = count;
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.buffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Int32Array(data), this.gl.STATIC_DRAW);
    }
    getCount(): number
    {
        return this.count;
    }
    bind()
    {
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.buffer);

    }
    unbind()
    {
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
    }
    delete()
    {
        this.gl.deleteBuffer(this.buffer);
    }
}

export default IndexBuffer;