
function forEach<T>(array: T[], fn: (arg: T, index?: number) => void): void
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

function create2DArray<T>(width: number, height: number, initializer: () => T): T[][]
{
    let array: any[] = new Array(height);

    for (let i = 0; i < height; i++) {
        array[i] = initializeWith(width, initializer);
    }

    return array as T[][];
}


// min<=x<max
function randomInt(min: number, max: number)
{
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}


export { forEach, create2DArray, randomInt };



