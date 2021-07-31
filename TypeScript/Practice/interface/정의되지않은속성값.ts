interface Non {
  readonly name: string;
  age?: number;
}
const a1: Non = {
  name: 'mike',
  //   birthday: '1997',
};
const a2 = {
  name: 'mike',
  birthday: '1997',
};
const a3: Non = a2;
