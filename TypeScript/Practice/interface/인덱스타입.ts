interface Index {
  readonly name: string;
  age: number;
  [key: string]: string | number;
}
const p33: Index = {
  name: 'mike',
  birthday: '1997',
  //   age: '25', // type error
  age: 25,
};
