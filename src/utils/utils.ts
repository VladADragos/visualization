import Array2D from "./Array2D";

function forEach<T>(array: T[], fn: (arg: T, index: number) => void): void
{
  for (let i = 0; i < array.length; i++) {
    fn(array[i], i);
  }
}

function forEachSetToFn<T>(array: T[], fn: () => T)
{
  for (let i = 0; i < array.length; i++) {
    array[i] = fn();
  }
}

function initializeWith<T>(length: number, fn: () => T): T[]
{
  const array: T[] = new Array(length);
  forEachSetToFn<T>(array, fn);
  return array;
}

function get2dIndexAs1d(y: number, x: number, width: number): number
{
  return y + x * width;
}

function randomInt(min: number, max: number)
{
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function createImg(path: string): HTMLImageElement
{
  const img = new Image();
  img.src = path;

  return img;
}

async function getFileContents(path: string): Promise<string>
{
  const res = await fetch(path);
  return res.text();
}

function ByteArraytoHexString(arr: Uint8ClampedArray)
{
  let str = "#";
  for (let i = 0; i < arr.length - 1; i++) {
    let s = arr[i].toString(16);
    str = s.length === 1 ? str.concat(("0").concat(s)) : str.concat(s);
  }

  return str;
}


function getHex(length: number)
{
  let num = 0;
  let digits = 1;
  return () =>
  {
    let str = "#".concat("0".repeat(length - digits));
    str += num.toString(16);
    num += 16;
    digits = (num >= (16 * (16 ** (digits - 1)))) ? digits + 1 : digits;
    return str;
  }
}



export { forEach, randomInt, get2dIndexAs1d, Array2D, createImg, getHex, ByteArraytoHexString, getFileContents, initializeWith };