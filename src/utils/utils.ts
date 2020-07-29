
function forEach<T>(array: T[], fn: (arg: T) => void): void {
    for (let i = 0; i < array.length; i++) {
        fn(array[i]);
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

function create2DArray<T>(width: number, height: number, initializer: () => T): T[][] {
    let array: any[] = new Array(height);

    for (let i = 0; i < height; i++) {
        array[i] = initializeWith(width, initializer);
    }

    return array as T[][];
}


export { forEach, create2DArray };



