class Program {
    gl: WebGL2RenderingContext;
    program: WebGLProgram;
    constructor(gl: WebGL2RenderingContext) {

        this.gl = gl;
        const program = this.gl.createProgram();
        if (program) {
            this.program = program;
        } else {
            throw new Error("Initial program creation failed");
        }
    }

    link() {
        if (this.program) {
            this.gl.linkProgram(this.program);
            this.gl.validateProgram(this.program);
            const programLink = this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS);
            const programValid = this.gl.getProgramParameter(this.program, this.gl.VALIDATE_STATUS);
            const attachedShaders = this.gl.getProgramParameter(this.program, this.gl.ATTACHED_SHADERS);
            if (!programLink) {
                console.log("program is valid:" + programValid);
                console.log("program linked successfully:" + programLink);
                console.log("shaders:", attachedShaders);
                const error = "[LINKING_ERROR]: " + programLink;
                console.error(error);
                throw new Error(error)
            }
        } else {
            const error = "[LINKING_ERROR]: program is null when attempting to link";
            console.log(error);
        }
    }

    use() {
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