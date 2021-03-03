import { getFileContents } from "../utils/utils";


class WebGLContextProvider
{
    gl: WebGL2RenderingContext;
    program: Nullable<WebGLProgram>;
    fragmentShader: Undefinable<WebGLShader>;
    vertexShader: Undefinable<WebGLShader>;
    buffer: Undefinable<WebGLBuffer>;
    positionAttributeLocation: any;

    private static glContext: WebGL2RenderingContext;
    static getInstance()
    {
        if (!WebGLContextProvider.glContext) throw new Error("valid webgl context is not set");
        return WebGLContextProvider.glContext;
    }
    static setInstance(ctx: WebGL2RenderingContext)
    {
        return WebGLContextProvider.glContext = ctx;
    }

    getProgram(): Nullable<WebGLProgram>
    {
        return this.program;
    }

    constructor(ctx: WebGL2RenderingContext)
    {
        //console.log("hello?");
        this.gl = ctx;
        const program = ctx.createProgram();
        if (program) {
            this.program = program;
        } else {
            this.program = null;
            console.error("Initial program creation failed");
        }
        //console.log("program ", this.program);

        this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
        this.gl.clearColor(0.0, 0.8, 0.5, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)
        // const prog = ctx.createProgram();
        // const s = ctx.createShader(ctx.VERTEX_SHADER);
        // ctx.shaderSource(s)
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
    init()
    {
        if (this.program) {

            // const a = this.gl.getAttribLocation(this.program, "a_position");
        }
    }
    use()
    {

        if (this.program) {
            console.log(this.gl.getProgramInfoLog(this.program));
            this.gl.useProgram(this.program);
        } else {
            const error = "error using program"
            // console.error(error);
            throw new Error(error);
        }
        // let s: Map<number, number> = new Map();
        // this.ctx.readPixels();
    }

    async addFrag(shaderPath: string)
    {
        const shaderContent = await getFileContents(shaderPath);
        this.createShader(this.gl.FRAGMENT_SHADER, shaderContent);
    }


    async addVertex(shaderPath: string)
    {
        const shaderContent = await getFileContents(shaderPath);
        this.createShader(this.gl.VERTEX_SHADER, shaderContent);

    }

    removeFragmentShader()
    {
        if (this.fragmentShader && this.program) {
            this.gl.detachShader(this.program, this.fragmentShader);
            this.gl.deleteShader(this.fragmentShader);
        } else {
            //console.log("error removing frag shader");
        }
    }

    removeVertexShader()
    {
        if (this.vertexShader && this.program) {

            this.gl.detachShader(this.program, this.vertexShader);
            this.gl.deleteShader(this.vertexShader);
        } else {
            //console.log("error removing vert shader");
        }
    }

    private createShader(type: number, shaderContent: string)
    {
        const shader = this.gl.createShader(type);
        if (shader && this.program) {
            this.gl.shaderSource(shader, shaderContent);
            this.gl.compileShader(shader);
            const error = "could not compile shader:" + this.gl.getShaderInfoLog(shader);
            if (this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
                this.gl.attachShader(this.program, shader);
                return;
            }
            this.gl.deleteShader(shader);
            throw new Error(error);
        } else {
            const error = "Shader or program is null";
            throw new Error(error);
        }
    }


    cleanup()
    {
        this.gl.useProgram(null);
        if (this.buffer) {
            this.gl.deleteBuffer(this.buffer);
            this.buffer = undefined;
        }
        if (this.program) {
            this.gl.deleteProgram(this.program);
            this.program = null;
        }
    }

    addBuffer()
    {
        const buffer = this.gl.createBuffer();
        if (buffer) {
            this.buffer = buffer;
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
            const positions =
                [-0.5, -0.5,
                    0.5, -0.5,
                    0.5, 0.5,
                -0.5, 0.5,

                ];
            const indices = [0, 1, 2, 2, 3, 0];
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);
            // const vao = this.gl.createVertexArray();
            // this.gl.bindVertexArray(vao);
            this.gl.enableVertexAttribArray(this.positionAttributeLocation);
            this.gl.vertexAttribPointer(this.positionAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);

            const ibo = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, ibo);
            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Int32Array(indices), this.gl.STATIC_DRAW);
        }
    }

    addVertexArrayObject()
    {
        // const vao: Nullable<WebGLVertexArrayObject> = this.gl.createVertexArray();
    }
    removeVertexArrayObject()
    {

    }

    // // Set the clear color to darkish green.

    // // Clear the context with the newly set color. This is
    // // the function call that actually does the drawing.
}








export default WebGLContextProvider;