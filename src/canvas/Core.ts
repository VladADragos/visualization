import { getFileContents } from '../utils/utils';
import WebGLContextProvider from './WebGLContextProvider';
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

class Shader
{
    gl: WebGL2RenderingContext;
    program: Program;
    shader: Nullable<WebGLShader>;
    constructor(program: Program, type: ShaderType)
    {
        this.gl = WebGLContextProvider.getInstance();
        this.program = program;
        const shaderType = type === ShaderType.FRAGMENT ? this.gl.FRAGMENT_SHADER : this.gl.VERTEX_SHADER;
        this.shader = this.gl.createShader(shaderType);
    }


    async bind(shaderPath: string)
    {

        const shaderContent = await getFileContents(shaderPath);
        this.createShader(shaderContent);
    }

    unbind()
    {
        if (this.shader && this.program && this.program.program) {
            this.gl.detachShader(this.program.program, this.shader);
            this.gl.deleteShader(this.shader);
        } else {
            //console.log("error removing vert shader");
        }
    }

    private createShader(shaderContent: string)
    {
        if (this.shader && this.program) {
            this.gl.shaderSource(this.shader, shaderContent);
            this.gl.compileShader(this.shader);
            const error = "could not compile shader:" + this.gl.getShaderInfoLog(this.shader);
            if (this.gl.getShaderParameter(this.shader, this.gl.COMPILE_STATUS)) {
                this.gl.attachShader(this.program.program, this.shader);
                return;
            }
            this.gl.deleteShader(this.shader);
            throw new Error(error);
        } else {
            const error = "Shader or program is null";
            throw new Error(error);
        }
    }
}

enum ShaderType
{
    VERTEX,
    FRAGMENT
}
class Program
{
    gl: WebGL2RenderingContext;
    program: WebGLProgram;
    constructor()
    {

        this.gl = WebGLContextProvider.getInstance();
        const program = this.gl.createProgram();
        if (program) {
            this.program = program;
        } else {
            throw new Error("Initial program creation failed");
        }
    }

    link()
    {
        if (this.program) {
            this.gl.linkProgram(this.program);
            this.gl.validateProgram(this.program);
            if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
                const error = "[LINKING_ERROR]: " + this.gl.getProgramInfoLog(this.program);
                throw new Error(error)
            }
        } else {
            const error = "[LINKING_ERROR]: program is null when attempting to link";
            console.log(error);
        }
    }

    use()
    {
        if (this.program) {
            this.gl.useProgram(this.program);
        } else {
            const error = "error using program"
            // console.error(error);
            throw new Error(error);
        }
    }



}

export { ShaderType, Program, Shader, VertexBuffer, IndexBuffer };