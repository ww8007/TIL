function makeArray<T>(defaultValue: T, size: number): T[] {
  const arr: T[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(defaultValue);
  }
  return arr;
}

const arr11 = makeArray<number>(1, 10);
const arr22 = makeArray<string>('empty', 10);
const arr33 = makeArray(1, 10);
const arr44 = makeArray('empty', 10);
