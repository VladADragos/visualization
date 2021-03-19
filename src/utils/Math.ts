import Array2d from './Array2D';
import { forEach } from './utils';
import Array2D from './Array2D';
class Matrix4x4
{
    // array: Array2d<number> = new Array2d<number>(4, 4, () => 0);
    array: Float32Array = new Float32Array(16);

    // fill(col0:Vec4,col1:Vec4,col2:Vec4,col3:Vec4){
    //     this.array.set(0,0,col0.array[0]);
    //     this.array.set(1,0,col0.array[1]);
    //     this.array.set(2,0,col0.array[2]);
    //     this.array.set(3,0,col0.array[3]);

    //     this.array.set(0,1,col0.array[0]);
    //     this.array.set(1,1,col0.array[1]);
    //     this.array.set(2,1,col0.array[2]);
    //     this.array.set(3,1,col0.array[3]);

    //     this.array.set(0,2,col0.array[0]);
    //     this.array.set(1,2,col0.array[1]);
    //     this.array.set(2,2,col0.array[2]);
    //     this.array.set(3,2,col0.array[3]);

    //     this.array.set(0,3,col0.array[0]);
    //     this.array.set(1,3,col0.array[1]);
    //     this.array.set(2,3,col0.array[2]);
    //     this.array.set(3,3,col0.array[3]);

   
    //     return this;
    // }
    
    static ortho(left:number, right:number, bottom:number, top:number, near:number, far:number):Matrix4x4{

        let matrix = new Matrix4x4();
        matrix.array = new Float32Array(16);
        let out = matrix.array;

        let lr = 1 / (left - right);
        let bt = 1 / (bottom - top);
        let nf = 1 / (near - far);
        out[0] = -2 * lr;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = -2 * bt;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = 2 * nf;
        out[11] = 0;
        out[12] = (left + right) * lr;
        out[13] = (top + bottom) * bt;
        out[14] = (far + near) * nf;
        out[15] = 1;


        // const col0 = new Vec4(2/(right-left),0,0,0);
        // const col1 = new Vec4(0,2/(top-bottom),0,0);
        // const col2 = new Vec4(0,0,-2/(far-near),0);
        // const col3 = new Vec4(-((right+left)/(right-left)),-((top+bottom)/(top-bottom)),-((far+near)/(far-near)),1);
        // matrix.fill(col0,col1,col2,col3);
        return matrix;
    }
    // getAsArray(): number[]
    // {
    //     return this.array.asArray();
    // }

    // scalar x matrix
    // scale(scalar: number)
    // {
    //     const array = this.array.asArray();
    //     forEach(array, (number, index) => { array[index] = number * scalar });
    // }

    // identity()
    // {
    //     this.array.set(0, 0, 1);
    //     this.array.set(1, 1, 1);
    //     this.array.set(2, 2, 1);
    //     this.array.set(3, 3, 1);
    // }

    // multiply(otherMatrix: Matrix4x4){
    //     let a = 0;
    //     let arr2: Array2D<number> = this.array.copy();
    //     for(let k = 0; k<4;k++){
    //         for(let i = 0; i<4;i++){
    //             for(let j = 0; j<4;j++){
    //                 a += arr2.get(i,j)*otherMatrix.array.get(j,i);
    //             } 
    //             this.array.set(k,i,a);
    //             a=0;
    //         }
    //     }
    //     return this;
    // }

    // multiplyVec(vector: Vec4){

    // }

    // copy():Matrix4x4{
    //     const matrix = new Matrix4x4();
    //     matrix.array = this.array.copy();
    //     return matrix;
    // }
    // Add

}


class Matrix3x3
{
    array: Array2d<number> = new Array2d<number>(3, 3, () => 0);

    fill(col0:Vec3,col1:Vec3,col2:Vec3,col3:Vec3){
        this.array.set(0,0,col0.array[0]);
        this.array.set(1,0,col0.array[1]);
        this.array.set(2,0,col0.array[2]);

        this.array.set(0,1,col1.array[0]);
        this.array.set(1,1,col1.array[1]);
        this.array.set(2,1,col1.array[2]);

        this.array.set(0,2,col2.array[0]);
        this.array.set(1,2,col2.array[1]);
        this.array.set(2,2,col2.array[2]);

        this.array.set(0,3,col3.array[0]);
        this.array.set(1,3,col3.array[1]);
        this.array.set(2,3,col3.array[2]);
        return this;
    }
    getAsArray(): number[]
    {
        return this.array.asArray();
    }

    // scalar x matrix
    scale(scalar: number)
    {
        const array = this.array.asArray();
        forEach(array, (number, index) => { array[index] = number * scalar });
    }

    identity()
    {
        this.array.set(0, 0, 1);
        this.array.set(1, 1, 1);
        this.array.set(2, 2, 1);
    }

    multiply(otherMatrix: Matrix3x3){
        let a = 0;
        let arr2: Array2D<number> = this.array.copy();
        for(let k = 0; k<3;k++){
            for(let i = 0; i<3;i++){
                for(let j = 0; j<3;j++){
                    a += arr2.get(i,j)*otherMatrix.array.get(j,i);
                } 
                this.array.set(k,i,a);
                a=0;
            }
        }
        return this;
    }

    multiplyVec(vector: Vec3){

    }

    copy():Matrix3x3{
        const matrix = new Matrix3x3();
        matrix.array = this.array.copy();
        return matrix;
    }
}


class Vec2{
    array: [number,number] = [0,0];
    constructor(a:number,b:number){
        this.array[0] = a;
        this.array[1] = b;
    }
    add(other: Vec3){
        this.array[0] = other.array[0];
        this.array[1] = other.array[1];
    }
    scale(scalar: number){
        this.array[0] *= scalar;
        this.array[1] *= scalar;
    }
}

class Vec3{
    array: [number,number,number] = [0,0,0];
    constructor(a:number,b:number,c:number){
        this.array[0] = a;
        this.array[1] = b;
        this.array[2] = c;
    }
    add(other: Vec3){
        this.array[0] = other.array[0];
        this.array[1] = other.array[1];
        this.array[2] = other.array[2];
    }
    scale(scalar: number){
        this.array[0] *= scalar;
        this.array[1] *= scalar;
        this.array[2] *= scalar;
    }
}

class Vec4{
    array: [number,number,number,number] = [0,0,0,0];
    constructor(a:number,b:number,c:number,d:number){
        this.array[0] = a;
        this.array[1] = b;
        this.array[2] = c;
        this.array[3] = d;

    }
    add(other: Vec4){
        this.array[0] = other.array[0];
        this.array[1] = other.array[1];
        this.array[2] = other.array[2];
        this.array[3] = other.array[3];

    }

    scale(scalar:number){
        this.array[0] *= scalar;
        this.array[1] *= scalar;
        this.array[2] *= scalar;
        this.array[3] *= scalar;
    }
}


export {Matrix4x4,Matrix3x3,Vec4,Vec3,Vec2};