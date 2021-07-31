function add(x: number, y: number): number;
function add(x: string, y: string): string;
function add(x: number | string, y: number | string): number | string {
  if (typeof x === 'number' && typeof y === 'number') {
    return x + y;
  } else {
    const result = Number(x) | Number(y);
    return result.toString();
  }
}
const v1: number = add(1, 2);
// console.log(add(1, '2'));
