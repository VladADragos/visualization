import Program from "./Program";
import fragShader from '../shaders/out/fragShader';
import vertexShader from '../shaders/out/vertexShader';

enum ShaderType
{
    VERTEX,
    FRAGMENT
}
class Shader
{
    gl: WebGL2RenderingContext;
    program: Program;
    shader: Nullable<WebGLShader>;
    shaderType: ShaderType;
    constructor(gl: WebGL2RenderingContext, program: Program, type: ShaderType)
    {
        this.gl = gl;
        this.program = program;
        this.shaderType = type;
        const shaderType = type === ShaderType.FRAGMENT ? this.gl.FRAGMENT_SHADER : this.gl.VERTEX_SHADER;
        // const shaderContent = type === ShaderType.FRAGMENT ? fragShader: vertexShader;
        this.shader = this.gl.createShader(shaderType);
    }


    bind()
    {

        const shaderContent = this.shaderType === ShaderType.FRAGMENT ? fragShader : vertexShader;
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

    setUniform4fv(name: string, arr: Float32Array)
    {
        this.gl.uniform4fv(this.gl.getUniformLocation(this.program.program, name), arr);
    }
    setUniformMat4f(name: string, matrix: Iterable<number>)
    {
        this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.program.program, name), false, matrix);
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

export { ShaderType, Shader };