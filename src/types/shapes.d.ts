interface IVec2 {
  x: number;
  y: number;
}
interface IVec3 {
  x: number;
  y: number;
  z: number;
}

interface IShape {
  origin: IVec2;
}

interface IRect extends IShape {
  width: number;
  height: number;
}

interface ICircle extends IShape {
  radius: number;
}

interface ITriangle extends IShape {
  width: number;
  height: number;
}
