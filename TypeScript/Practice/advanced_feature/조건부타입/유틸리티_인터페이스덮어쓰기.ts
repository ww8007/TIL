type Overwrite<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U;
interface Person {
  name: string;
  age: number;
}
type T111 = Overwrite<Person, { age: string; nation: string }>;
const p2: T111 = {
  name: 'mike',
  age: '23',
  nation: 'korea',
};
