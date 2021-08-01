type Omit2<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>>;
interface Person {
  name: string;
  age: number;
  nation: string;
}
type T1One = Omit2<Person, 'nation' | 'age'>;
const p: T1One = {
  name: 'mike',
};
