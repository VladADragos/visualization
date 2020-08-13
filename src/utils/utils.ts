import Array2D from "./Array2D";

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

function createImg(path: string): HTMLImageElement {
  const img = new Image();
  img.src = path;

  return img;
}

export { forEach, randomInt, get2dIndexAs1d, Array2D, createImg };
