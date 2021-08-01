type StringPropertyNames<T> = {
  [K in keyof T]: T[K] extends String ? K : never;
}[keyof T];
type StringProperties<T> = Pick<T, StringPropertyNames<T>>;
interface Person {
  name: string;
  age: number;
  nation: string;
}
type T1o = StringPropertyNames<Person>; // "name" | "nation"
type T2t = StringProperties<Person>; // {name: string; nation: string;}
