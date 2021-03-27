import WebGLContextProvider from '../../canvas/WebGLContextProvider';

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

    constructor()
    {
        this.gl = WebGLContextProvider.getInstance();
    }

    push(count: number, type: number)
    {

        this.elements.push(new VertexBufferLayotElement(count, type, false));
        this.stride += VertexBufferLayot.getSizeOfType(type);
    }

    getElements(): VertexBufferLayotElement[]
    {
        return this.elements;
    }
    getStride(): number
    {
        return this.stride;
    }

    static getSizeOfType(type: number): number
    {
        switch (type) {
            case WebGLContextProvider.getInstance().UNSIGNED_INT:
            case WebGLContextProvider.getInstance().FLOAT:
                return 4;
            case WebGLContextProvider.getInstance().BYTE:
                return 1;
            default:
                return 0;
        }
    }
}

export default VertexBufferLayot;