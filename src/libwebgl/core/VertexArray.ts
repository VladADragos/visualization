import VertexBuffer from './VertexBuffer';
import VertexBufferLayout from "./VertexBufferLayout";



class VertexArray
{
    gl: WebGL2RenderingContext;
    vao!: WebGLVertexArrayObject;

    constructor(gl: WebGL2RenderingContext)
    {
        this.gl = gl;
        const vao = this.gl.createVertexArray();
        if (vao) {
            this.vao = vao;
        }
    }

    bind()
    {
        this.gl.bindVertexArray(this.vao);
    }

    unbind()
    {
        this.gl.bindVertexArray(null);
    }

    addBuffer(vb: VertexBuffer, layout: VertexBufferLayout)
    {
        vb.bind();
        const elements = layout.getElements();
        let offset = 0;
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            this.gl.enableVertexAttribArray(i);
            // this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 0, 0);
            this.gl.vertexAttribPointer(i, element.count, element.type, element.normalized, layout.getStride(), offset);
            offset += element.count * VertexBufferLayout.getSizeOfType(this.gl, element.type);
        }

    }

    addLayout()
    {

    }
}



export default VertexArray;