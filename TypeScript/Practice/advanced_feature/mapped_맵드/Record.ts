interface PickPerson {
  name: string;
  age: number;
  lan: string;
}

type Record2<K extends string, T> = { [P in K]: T }; // -1-
type TRecord = Record2<'p1' | 'p2', PickPerson>;
// type type T1 = { p1: Person; p2: Person'}
