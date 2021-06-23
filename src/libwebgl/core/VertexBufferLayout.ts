import * as  webglConstants from "./webglConstants";

class VertexBufferLayotElement {
    count: number;
    type: webglConstants.DataTypes;
    constructor(count: number, type: webglConstants.DataTypes) {
        this.count = count;
        this.type = type;
    }


}

class VertexBufferLayot {
    private elements: VertexBufferLayotElement[] = [];
    private stride: number = 0;



    push(count: number, type: webglConstants.DataTypes) {

        this.elements.push(new VertexBufferLayotElement(count, type));
        // this.stride += VertexBufferLayot.getSizeOfType(type);
    }

    getElements(): VertexBufferLayotElement[] {
        return this.elements;
    }
    getStride(): number {
        return this.stride;
    }

    static getSizeOfType(type: webglConstants.DataTypes): number {
        switch (type) {
            case webglConstants.DataTypes.UNSIGNED_INT:
            case webglConstants.DataTypes.FLOAT:
                return 4;
            case webglConstants.DataTypes.BYTE:
                return 1;
            default:
                throw new Error(`${type} is an invalid type`);
        }
    }
}

export default VertexBufferLayot;