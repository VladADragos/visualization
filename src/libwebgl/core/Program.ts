class Program
{
    gl: WebGL2RenderingContext;
    program: WebGLProgram;
    constructor(gl: WebGL2RenderingContext)
    {

        this.gl = gl;
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

export default Program;