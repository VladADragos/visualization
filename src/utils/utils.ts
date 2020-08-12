function forEach<T>(array: T[], fn: (arg: T, index?: number) => void): void {
  for (let i = 0; i < array.length; i++) {
    fn(array[i], i);
  }
}

function forEachSetToFn<T>(array: T[], fn: () => T) {
  for (let i = 0; i < array.length; i++) {
    array[i] = fn();
  }
}

function initializeWith<T>(length: number, fn: () => T): T[] {
  const array: T[] = new Array(length);
  forEachSetToFn<T>(array, fn);
  return array;
}

function get2dIndexAs1d(y: number, x: number, width: number): number {
  return y + x * width;
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

class Array2D<T> {
  array: T[];
  width: number;
  height: number;
  constructor(height: number, width: number, initializer: () => T) {
    this.width = width;
    this.height = height;
    this.array = new Array<T>(this.width * this.height);
    for (let i = 0; i < this.array.length; i++) {
      this.array[i] = initializer();
    }
  }
  get(y: number, x: number): T {
    return this.array[this.translateIndex(y, x)];
  }
  set(y: number, x: number, newValue: T) {
    this.array[this.translateIndex(y, x)] = newValue;
  }
  asArray(): T[] {
    return this.array;
  }
  forEach(f: (element: T) => void) {
    for (let i = 0; i < this.array.length; i++) {
      f(this.array[i]);
    }
  }

  translateIndex(y: number, x: number): number {
    return x + y * this.width;
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

export { forEach, randomInt, get2dIndexAs1d, Array2D };
