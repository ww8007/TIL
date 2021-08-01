type Pick2<T, K extends keyof T> = { [P in K]: T[P] };
interface PickPerson {
  name: string;
  age: number;
  lan: string;
}
type TPick = Pick2<PickPerson, 'name' | 'lan'>;
// type TPick = {name: string, lang: string;}
