class VertexBufferLayotElement
{
    count: number;
    type: number;
    normalized: boolean;
    constructor(count: number, type: number, normalized: boolean)
    {
        this.count = count;
        this.type = type;
        this.normalized = normalized;
    }


}

class VertexBufferLayot
{
    private elements: VertexBufferLayotElement[] = [];
    private stride: number = 0;
    private gl: WebGL2RenderingContext;

    constructor(gl: WebGL2RenderingContext)
    {
        this.gl = gl;
    }

    push(count: number, type: number)
    {

        this.elements.push(new VertexBufferLayotElement(count, type, false));
        this.stride += VertexBufferLayot.getSizeOfType(this.gl, type);
    }

    getElements(): VertexBufferLayotElement[]
    {
        return this.elements;
    }
    getStride(): number
    {
        return this.stride;
    }

    static getSizeOfType(gl: WebGL2RenderingContext, type: number): number
    {
        switch (type) {
            case gl.UNSIGNED_INT:
            case gl.FLOAT:
                return 4;
            case gl.BYTE:
                return 1;
            default:
                return -1;
        }
    }
}

export default VertexBufferLayot;