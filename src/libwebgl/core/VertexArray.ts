import VertexBuffer from './VertexBuffer';
import VertexBufferLayout from "./VertexBufferLayout";



class VertexArray {
    gl: WebGL2RenderingContext;
    vao: WebGLVertexArrayObject;
    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
        const vao = this.gl.createVertexArray();
        if (vao) {
            this.vao = vao;
        } else {
            throw Error("could not create VAO");
        }
    }

    bind() {
        this.gl.bindVertexArray(this.vao);
    }

    unbind() {
        this.gl.bindVertexArray(null);
    }

    addBuffer(vb: VertexBuffer, layout: VertexBufferLayout) {
        const elements = layout.getElements();
        let offset = 0;
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            this.gl.enableVertexAttribArray(i);
            // console.log(i);
            // console.log(element.count);
            // this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 0, 0);
            // console.log("count:", element.count);
            // console.log("type:", element.type);
            // console.log("layout stride:", layout.getStride());
            // console.log("offset", offset);
            this.gl.vertexAttribPointer(i, element.count, element.type, false, layout.getStride(), offset);
            offset += element.count * VertexBufferLayout.getSizeOfType(element.type);
        }

    }

    addLayout() {

    }
}



export default VertexArray;