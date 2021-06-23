class Array2D<T> {
  array: T[];
  width: number;
  height: number;
  length: number;
  initializer: () => T;
  constructor(height: number, width: number, initializer: () => T) {
    this.initializer = initializer;
    this.width = width;
    this.height = height;
    this.length = width * height;
    this.array = new Array<T>(this.width * this.height);
    for (let i = 0; i < this.array.length; i++) {
      this.array[i] = initializer();
    }
  }
  get(y: number, x: number): T {
    const ret = this.array[this.translateIndex(y, x)];
    if (ret === undefined || ret === null) {
      console.log("index was ", y, " ", x);
      console.log(this.length);
      throw Error("index outside bounds");
    }
    return ret;
  }
  set(y: number, x: number, newValue: T) {
    this.array[this.translateIndex(y, x)] = newValue;
  }
  asArray(): T[] {
    return this.array;
  }
  forEach(f: (element: T, index: number) => void) {
    for (let i = 0; i < this.array.length; i++) {
      f(this.array[i], i);
    }
  }
  clear() {
    for (let i = 0; i < this.array.length; i++) {
      this.array[i] = this.initializer();
    }
  }
  translateIndex(y: number, x: number): number {
    return x + y * this.width;
  }
  copy(): Array2D<T> {
    const arr = new Array2D(this.height, this.width, () => this.initializer());
    this.forEach((e, index) => arr.array[index] = e);
    return arr;
  }
  print() {
    let str: string = "";

    for (let y = 0; y < this.height; y++) {
      str += "[";
      for (let x = 0; x < this.width; x++) {
        str += this.array[this.translateIndex(y, x)];
        if (x + 1 < this.width) str += " | ";
      }
      str += "]\n";
    }
    console.log(str);
  }
}

export default Array2D;
