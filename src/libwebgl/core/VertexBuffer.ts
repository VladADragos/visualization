import WebGLContextProvider from "./WebGLContexProvider";


class VertexBuffer 
{
    gl: WebGL2RenderingContext;
    buffer: WebGLBuffer;
    constructor(data: number[], size: number)
    {
        this.gl = WebGLContextProvider.getInstance();
        this.buffer = this.gl.createBuffer() as WebGLBuffer;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);

        this.gl.enableVertexAttribArray(0);
        this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 0, 0);
    }
    bind()
    {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);

    }
    unbind()
    {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    }
    delete()
    {
        this.gl.deleteBuffer(this.buffer);
    }
}

export default VertexBuffer;