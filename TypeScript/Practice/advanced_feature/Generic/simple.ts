function makeNumArr(defaultValue: number, size: number): number[] {
  const arr: number[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(defaultValue);
  }
  return arr;
}

function makeStringArr(defaultValue: string, size: number): string[] {
  const arr: string[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(defaultValue);
  }
  return arr;
}

const arr1 = makeNumArr(1, 10);
const arr2 = makeStringArr('empty', 10);
