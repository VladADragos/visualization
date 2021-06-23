import Program from "./Program";
import fragShader from '../shaders/out/fragShader';
import vertexShader from '../shaders/out/vertexShader';
import * as webglConstants from "./webglConstants";



class Shader {
    gl: WebGL2RenderingContext;
    program: Program;
    shader: Nullable<WebGLShader>;
    shaderType: webglConstants.Shaders;
    constructor(gl: WebGL2RenderingContext, program: Program, shaderType: webglConstants.Shaders) {
        this.gl = gl;
        this.program = program;
        this.shaderType = shaderType;
        this.shader = this.gl.createShader(shaderType);
    }


    bind() {
        const shaderContent = this.shaderType
            === webglConstants.Shaders.VERTEX_SHADER ? vertexShader : fragShader;
        this.createShader(shaderContent);
    }

    unbind() {
        if (this.shader && this.program && this.program.program) {
            this.gl.detachShader(this.program.program, this.shader);
            this.gl.deleteShader(this.shader);
        } else {
            console.log("error removing vert shader");
        }
    }

    setUniform4fv(name: string, arr: Float32Array) {
        this.gl.uniform4fv(this.gl.getUniformLocation(this.program.program, name), arr);
    }
    setUniformMat4f(name: string, matrix: Iterable<number>) {
        this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.program.program, name), false, matrix);
    }
    private createShader(shaderContent: string) {
        if (this.shader && this.program) {
            this.gl.shaderSource(this.shader, shaderContent);
            this.gl.compileShader(this.shader);
            const error = "could not compile shader:" + this.gl.getShaderInfoLog(this.shader);
            if (this.gl.getShaderParameter(this.shader, webglConstants.Shaders.COMPILE_STATUS)) {
                return this.gl.attachShader(this.program.program, this.shader);
            } else {
                this.gl.deleteShader(this.shader);
                throw new Error(error);
            }
        } else {
            const error = "Shader or program is null";
            throw new Error(error);
        }
    }
}

export { Shader };