import Array2d from './Array2D';
import { forEach } from './utils';
import Array2D from './Array2D';
import { throws } from 'assert';
class Matrix4x4
{
    array: Array2d<number> = new Array2d<number>(4, 4, () => 0);
    constructor(){
    }

    fill(col0:Vec4,col1:Vec4,col2:Vec4,col3:Vec4){
        this.array.set(0,0,col0.array[0]);
        this.array.set(0,1,col0.array[1]);
        this.array.set(0,2,col0.array[2]);
        this.array.set(0,3,col0.array[3]);

        this.array.set(1,0,col0.array[0]);
        this.array.set(1,1,col0.array[1]);
        this.array.set(1,2,col0.array[2]);
        this.array.set(1,3,col0.array[3]);

        this.array.set(2,0,col0.array[0]);
        this.array.set(2,1,col0.array[1]);
        this.array.set(2,2,col0.array[2]);
        this.array.set(2,3,col0.array[3]);

        this.array.set(3,0,col0.array[0]);
        this.array.set(3,1,col0.array[1]);
        this.array.set(3,2,col0.array[2]);
        this.array.set(3,3,col0.array[3]);

   
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
        this.array.set(3, 3, 1);
    }

    multiply(otherMatrix: Matrix4x4){
        const time = console.time("test");
        let a = 0;
        let arr2: Array2D<number> = this.array.copy();
        for(let k = 0; k<4;k++){
            for(let i = 0; i<4;i++){
                for(let j = 0; j<4;j++){
                    a += arr2.get(i,j)*otherMatrix.array.get(j,i);
                } 
                this.array.set(k,i,a);
                a=0;
            }
        }
        console.timeEnd("test");
        return this;
    }

    multiplyVec(vector: Vec4){

    }

    copy():Matrix4x4{
        const matrix = new Matrix4x4();
        matrix.array = this.array.copy();
        return matrix;
    }
    // Add

}


class Matrix3x3
{
    array: Array2d<number> = new Array2d<number>(3, 3, () => 0);
    constructor(){
    }

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
        const time = console.time("test");
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
        console.timeEnd("test");
        return this;
    }

    multiplyVec(vector: Vec3){

    }

    copy():Matrix3x3{
        const matrix = new Matrix3x3();
        matrix.array = this.array.copy();
        return matrix;
    }
    // Add

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


export {Matrix4x4,Vec4};