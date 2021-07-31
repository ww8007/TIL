function addOne(value: number) {
  return value + 1;
}
const result = [1, 2, 3].map<number>(addOne);
// (value: number, index: number, array: number[]) => number;
