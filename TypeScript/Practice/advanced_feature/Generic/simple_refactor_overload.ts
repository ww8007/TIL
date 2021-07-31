function makeArr(defaultValue: number, size: number): number[];
function makeArr(defaultValue: string, size: number): string[];
// @ts-ignore
function makeArr(defaultValue, size) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(defaultValue);
  }
  return arr;
}
